import { Request, Response } from "express";
import { feedbackServices } from "./feedback.service";

const createFeedback = async (req: Request, res: Response) => {
    try {
        const data = req.body;


        const result = await feedbackServices.createFeedback(data);

        res.status(201).json({
            data: result,
            message: "Feedback successfull."
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message || "Something wrong to feedback."
        })
    }
};

const getSingleFeedback = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;


        const result = await feedbackServices.getSingleFeedback(userId as string);

        res.status(201).json({
            data: result,
            message: "Feedback retrived successfull."
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message || "Something wrong to retrived feedback."
        })
    }
}

export const feedbackControllers = {
    createFeedback,
    getSingleFeedback
};