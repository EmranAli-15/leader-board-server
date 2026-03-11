import { NextFunction, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";

export const Auth = (role: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;

            let decoded = null;
            if (token) {
                decoded = jwtDecode(token) as any;
            };

            if (!token || !decoded || (decoded?.role !== role)) {
                throw new Error("Unauthorized action.");
            }

            next();

        } catch (error: any) {
            return res.status(403).json({
                message: error.message || "Unauthorized action."
            })
        }
    }
}