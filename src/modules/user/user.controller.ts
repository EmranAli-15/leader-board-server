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
    } catch (error: any) {
        res.status(400).json({
            message: error.message || "User registrtion failed."
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
    } catch (error: any) {
        res.status(400).json({
            message: error.message || "Something wrong for login."
        })
    }
};

const updateUserData = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const data = req.body;
        const stringUserId = userId?.toString();

        let result;

        if (stringUserId) {
            result = await userServices.updateUserData({ userId: stringUserId, data })
        }

        res.status(201).json({
            data: result,
            message: "Profile updated successfull."
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message || "Something wrong to update data."
        })
    }
};

const changeUserPassword = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const { userId, currentPass, newPass } = data;

        const result = await userServices.changeUserPassword({ userId, currentPass, newPass });

        res.status(201).json({
            data: result,
            message: "Password changed successfull."
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message || "Something wrong to change password."
        })
    }
}

export const userControllers = {
    createUser,
    loginUser,
    updateUserData,
    changeUserPassword
};