"use server"
import * as z from "zod"
import { RegisterSchema } from "@schemas"
import bcrypt from "bcryptjs"
import { db } from "@lib/db"
import { getUserByEmail } from "@data/user"

export const Register = async(values  : z.infer<typeof RegisterSchema>) =>{
    const validatedFields = RegisterSchema.safeParse(values)
    
    if(!validatedFields.success){
        return { error : "Invalid Fields"}
    }
    const {email, password, name} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)
    
    if(existingUser){
        return { error : "Email already in use."}
    }

    await db.User.create({
        data:{
            name, 
            email, 
            password: hashedPassword
        }
    })

    // TODO; Send Verification token email
    return { success : "User Registered Successfully."}
}
