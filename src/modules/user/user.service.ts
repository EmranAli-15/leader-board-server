import { UserCollection } from "../../server";
import { AppError } from "../../utils/AppError";
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
    const hashPass = await hashGenerate(data.password);

    data.password = hashPass as string;
    const result = await UserCollection.insertOne(data);
    return result;
};


const loginUser = async ({ email, password }: { email: string, password: string }) => {
    const isUserExist = await UserCollection.findOne({ email: email });

    if(!isUserExist){
        return new AppError(404, "User not exist.")
    }
    else{
        const passwordMatched = await hashMatch(password, isUserExist.password)
        if(passwordMatched){
            return "Authorized"
        }
    }

    console.log(isUserExist);

    // const plainPass = hashMatch()
}

export const userServices = {
    createUser,
    loginUser
};