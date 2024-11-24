import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import {z} from "zod"
import {usernameValidation} from '@/schemas/signUpSchema'

const usernameQuerySchema = z.object({
    username:usernameValidation
})

export async function GET(request:Request) {
    await dbConnect()
    try {
        const {searchParams} = new URL(request.url);
        const queryParams ={username : searchParams.get('username')};
        const result = usernameQuerySchema.safeParse(queryParams);
        console.log("Name checking "+JSON.stringify(result));
        if(!result.success){
            const usernameError = result.error.format().username?._errors || []
            return Response.json({
                success:false,
                message: usernameError.length > 0 ? usernameError.join(' , ') :
                "Invalid query Parameter"
            },{status:400}) 

        }else{
            const {username} = queryParams
            console.log(username)
            const existingVerifiedUser  = await UserModel.findOne({username , isVerified : true})
            if(existingVerifiedUser){
                return Response.json({
                    success:false,
                    message: "Username Exists " 
                },{status:400})
            }
            return Response.json({
                success:true,
                message: "Username is unique"
            },{status:200})
        }

    } catch (error) {
        console.log("Error checking name : "+error);
        return Response.json({
            success:false,
            message: "Error checking name : "+error
        },{status:500})
    }
}

