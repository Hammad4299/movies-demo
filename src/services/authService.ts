import envConfig from "@/config";
import UserModel from "@/db/models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { defaultTo } from "lodash";


const saltRounds = 15;
export async function encryptPassword(pass: string) {
    return bcrypt.hash(pass, saltRounds);
}
export async function checkPassword(pass: string, hash: string) {
    return bcrypt.compare(pass, hash);
}

export const authenticateUser = async (email: string, password: string) => {

    const user = await UserModel.findOne({ where: { email: email } });

    if (user) {

        if (await checkPassword(password, user.passwordHash)) {
            const { passwordHash, ...userInfo } = user.toJSON();
            return { user: userInfo, token: jwt.sign(userInfo, envConfig.nextAuthSecretKey, { expiresIn: '1h' }) };
        }
        throw new Error('Invalid credentials.')
    } else {
        throw new Error('Email not found.')
    }
}