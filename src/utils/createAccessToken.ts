import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

// require('crypto').randomBytes(50).toString('hex')

export const createAccessToken = (jwtPayload: any) => {
    return jwt.sign(
        jwtPayload,
        process.env.Token as string,
        {
            expiresIn: "30 days"
        }
    )
};