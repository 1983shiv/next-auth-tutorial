"use server"

import { currentRole } from "@lib/currentUser"
import { UserRole } from "@prisma/client"


export const serverAction = async() => {
    const role = await currentRole()

    if(role !== UserRole.ADMIN){
        return { error : "Forbidden"}
    }

    return { success: "Admin Action allowed"}
}