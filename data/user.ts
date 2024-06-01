import { db } from "@lib/db";


export const getUserByEmail = async(email: string) => {
    try {
        const user = await db.User.findUnique({
            where: {
                email,
            }
        });
        return user
    } catch (error) {
        console.log("getUserByEmail return null");
        return null
    }
}


export const getUserById = async(id: string) => {
    try {
        const user = await db.User.findUnique({
            where: {
                id,
            }
        });
        return user
    } catch (error) {
        console.log("getUserById return null");
        return null
    }
}