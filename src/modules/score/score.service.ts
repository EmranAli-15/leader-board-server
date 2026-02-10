import { ObjectId } from "mongodb";
import { ScoreCollection } from "../../server";

export type TScore = {
    userId: string,
    day: number,
    score: number
}

const addNewScore = async (data: TScore) => {
    const result = await ScoreCollection.insertOne(data);
    return result;
};

const updateScore = async ({ userId, score }: { userId: string, score: number }) => {
    const result = await ScoreCollection.updateOne({ _id: new ObjectId(userId) }, { $set: { score: score } }, { upsert: false });

    return result;
}



export const scoreServices = {
    addNewScore,
    updateScore
}