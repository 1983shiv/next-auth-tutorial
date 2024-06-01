"use server"
import * as z from "zod"
import { RegisterSchema } from "@schemas"


export const Register = async(values  : z.infer<typeof RegisterSchema>) =>{
    const validatedFields = RegisterSchema.safeParse(values)
    console.log("register", values)
    if(!validatedFields.success){
        return { error : "Invalid Fields"}
    } 
    return { success : "Registered Successfully."}
}
