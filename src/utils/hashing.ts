import bcrypt from "bcrypt";

export const hashGenerate = async (password: string) => {
    const hash = await bcrypt.hash(password, 10)
    return hash;
}

export const hashMatch = async (plainPassword: string, hashedPassword: string) => {
    const compered = await bcrypt.compare(plainPassword, hashedPassword);
    return compered;
}