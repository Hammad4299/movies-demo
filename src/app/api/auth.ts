import bcrypt from "bcrypt";

const saltRounds = 15;
export async function encryptPassword(pass: string) {
    console.log('encryotion string', pass)
    return bcrypt.hash(pass, saltRounds);
}
export async function checkPassword(pass: string, hash: string) {
    return bcrypt.compare(pass, hash);
}