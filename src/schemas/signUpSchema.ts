import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2,"Atleas 2 characters rquired")
    .max(20,"Max charactrss exceedded")
    .regex(/^[a-zA-Z0-9_]{3,20}$/,"Must not contain special Charactes")

export const signUpSchema = z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid email"}),
    password:z.string().min(8,{message:"Must be 8 charcters"}).max(20,{message:"Max reached"})
})