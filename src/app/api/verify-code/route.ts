import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import {z} from "zod"

export async function POST(request:Request){
    await dbConnect();

    try {
        
        const {searchParams} = new URL(request.url);
        const queryParams = {username : searchParams.get('username')};
        let username = queryParams.username
        username = decodeURIComponent(username || "");

        if(username==""){
            console.log("No Username Found : ");
            return Response.json({
                success:false,
                message: "No user name foundd "
            },{status:400})
        }
        let verifyCodeFromFrontend = await request.json();
        verifyCodeFromFrontend = verifyCodeFromFrontend.code
        if(!verifyCodeFromFrontend){
            console.log("No Code : ");
            return Response.json({
            success:false,
            message: "No Cpde "
        },{status:400})
        }

        const userToVerify = await UserModel.findOne({
            username
        })
        if(!userToVerify){
            console.log("No User  : ");
            return Response.json({
                success:false,
                message: "No user found " 
            },{status:400})
        }

        const codeNotExpired = new Date(userToVerify.verificationCodeExpiry) > new Date()
        if(!codeNotExpired){
            console.log("code expired on  "+new Date(userToVerify.verificationCodeExpiry))
            return Response.json({
                success:false,
                message:"Code expired try again "
            },{status:400})
        }
        const isVerficationCodeR8 : boolean = userToVerify.verificationCode == verifyCodeFromFrontend;
        userToVerify.isVerified =  isVerficationCodeR8;
        await userToVerify.save();
        console.log(userToVerify)

        if(isVerficationCodeR8){
            return Response.json({
                success:true,
                message:"User Verified "
            },{status:200})
        }
        return Response.json({
            success:false,
            message:"Wrong COde"
        },{status:400})

    } catch (error) {
        console.log("Error verifying : "+error);
        return Response.json({
            success:false,
            message: "Error verifying : "+error
        },{status:500})
    }

}