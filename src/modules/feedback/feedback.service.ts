import { ObjectId } from "mongodb"
import { FeedbackCollection } from "../../server";

type feedback = {
    userId: string | ObjectId,
    feedback: string
}

const createFeedback = async (data: feedback) => {
    data.userId = new ObjectId(data.userId);

    const result = await FeedbackCollection.updateOne(
        { userId: data.userId },
        { $set: data },
        { upsert: true }
    )

    return result;
};

const getSingleFeedback = async (userId: string) => {
    const result = await FeedbackCollection.findOne({ userId: new ObjectId(userId) });
    return result;
}


export const feedbackServices = {
    createFeedback,
    getSingleFeedback
};