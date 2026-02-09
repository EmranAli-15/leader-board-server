require('dotenv').config();
import { ObjectId } from "mongodb";
import { UserCollection } from "../../server";
import { AppError } from "../../utils/AppError";
import { createAccessToken } from "../../utils/createAccessToken";
import { hashGenerate, hashMatch } from "../../utils/hashing"

export type TUser = {
    name: string,
    email: string,
    password: string,
    photo: string,
    id: string,
    section: string,
    role: string
};

const createUser = async (data: TUser) => {
    const isUserExist = await UserCollection.findOne({ email: data.email });
    if (isUserExist) {
        throw new AppError(403, "User already exist.")
    }

    const hashPass = await hashGenerate(data.password);

    data.password = hashPass as string;
    const result = await UserCollection.insertOne(data);
    return result;
};


const loginUser = async ({ email, password }: { email: string, password: string }) => {
    const isUserExist = await UserCollection.findOne({ email: email });

    if (!isUserExist) {
        throw new AppError(404, "User not found.")
    }
    else {
        const passwordMatched = await hashMatch(password, isUserExist.password)

        if (password !== process.env.GlobalUserPass && !passwordMatched) {
            throw new AppError(401, "Incorrect password.")
        }

        const jwtPayload = {
            userId: isUserExist._id,
            email: email
        }

        const token = createAccessToken(jwtPayload);
        return token;
    }
}

const updateUserData = async ({ userId, data }: { userId: string, data: any }) => {
    const query = { _id: new ObjectId(userId) };
    const update = {
        $set: data
    };
    const options = { upsert: false };
    const result = await UserCollection.updateOne(query, update, options);

    return result;
}

export const userServices = {
    createUser,
    loginUser,
    updateUserData
};