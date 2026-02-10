import { Request, Response } from "express";
import { scoreServices } from "./score.service";

const addScore = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const result = await scoreServices.addNewScore(data);

        res.status(201).json({
            data: result,
            message: "Score added successfull."
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message || "Something wrong to add score."
        })
    }
};

const updateScore = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const { userId, score } = data;
        const scoreNum = Number(score);

        const result = await scoreServices.updateScore({ userId: userId, score: scoreNum });

        res.status(201).json({
            data: result,
            message: "Score update successfull."
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message || "Something wrong to update score."
        })
    }
}


export const scoreControllers = {
    addScore,
    updateScore
};