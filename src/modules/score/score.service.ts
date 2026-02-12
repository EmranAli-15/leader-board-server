import { ObjectId } from "mongodb";
import { ScoreCollection } from "../../server";

export type TScore = {
    userId: string,
    day: number,
    score: number
}

const addNewScore = async (data: TScore) => {
    const { userId, day, score } = data;
    const result = await ScoreCollection.insertOne({
        userId: new ObjectId(userId),
        day,
        score
    });
    return result;
};

const updateScore = async ({ userId, score }: { userId: string, score: number }) => {
    const result = await ScoreCollection.updateOne({ _id: new ObjectId(userId) }, { $set: { score: score } }, { upsert: false });

    return result;
};

const getAllTotalScore = async () => {
    const result = await ScoreCollection.aggregate([
        {
            $group: {
                _id: "$userId",
                totalScore: { $sum: "$score" }
            }
        },
        {
            $lookup: {
                from: "user",
                localField: "_id",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" },
        {
            $project: {
                _id: 0,
                userId: "$_id",
                name: "$user.name",
                photo: "$user.photo",
                totalScore: 1
            }
        },
        {
            $sort: {
                totalScore: -1
            }
        }
    ]).toArray();
    return result;
};

const getSingleUserScores = async (userId: string) => {
    const result = await ScoreCollection.find({ userId: new ObjectId(userId) }).sort({ "day": -1 }).toArray();
    return result;
}



export const scoreServices = {
    addNewScore,
    updateScore,
    getAllTotalScore,
    getSingleUserScores
}