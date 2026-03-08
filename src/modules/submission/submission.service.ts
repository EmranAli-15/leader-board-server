import { ObjectId } from "mongodb"
import { SubmissionCollection, UserCollection } from "../../server";
import { AppError } from "../../utils/AppError";

type submission = {
    time: string,
    userId: string | ObjectId,
    solution: string
}

const createSubmission = async (data: submission) => {
    data.userId = new ObjectId(data.userId);

    const user = await UserCollection.findOne({ _id: data.userId });

    if (user?.isDisabled) {
        throw new AppError(403, "Your profile is disabled.");
    }

    const result = await SubmissionCollection.updateOne(
        { userId: data.userId },
        { $set: data },
        { upsert: true }
    )

    return result;
};

const getSingleSubmission = async (userId: string) => {
    const result = await SubmissionCollection.findOne({ userId: new ObjectId(userId) });
    return result;
}

export const submissionServices = {
    createSubmission,
    getSingleSubmission
};