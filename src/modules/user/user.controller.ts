import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const result = await userServices.createUser(data);

        res.status(201).json({
            data: result,
            message: "User registered successfully."
        })
    } catch (error) {
        res.status(400).json({
            message: "User registrtion failed."
        })
    }
};

const loginUser = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const { email, password } = data;
        const result = await userServices.loginUser({ email, password });

        res.status(200).json({
            data: result,
            message: "User loggedin successfull."
        })
    } catch (error) {
        res.status(400).json({
            message: "User registrtion failed."
        })
    }
}

export const userControllers = {
    createUser,
    loginUser
};