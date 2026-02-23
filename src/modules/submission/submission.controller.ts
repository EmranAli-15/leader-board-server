import { Request, Response } from "express";
import { submissionServices } from "./submission.service";

const addSubmission = async (req: Request, res: Response) => {
    try {
        const data = req.body;


        const result = await submissionServices.createSubmission(data);

        res.status(201).json({
            data: result,
            message: "Submission successfull."
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message || "Something wrong to submission."
        })
    }
};


export const submissionControllers = {
    addSubmission
};