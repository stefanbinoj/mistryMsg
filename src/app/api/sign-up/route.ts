import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from "bcryptjs"

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(req:Request){
    await dbConnect()
    try {
        const {username,password,email} = await req.json()
        const existingUserVerifiedByUsername  = await UserModel.findOne({username , isVerified :true});

        //verification expiry
        const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours()+1);
        const verifyCode = Math.floor(100000+Math.random()*900000).toString()

        if(existingUserVerifiedByUsername){
            return Response.json({
                success:false,
                message:"Username is already taken"
            },{status:400})
        }

        const existingUserByEmail = await UserModel.findOne({email});

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success:false,
                    message:"User Exists"
                },{status:400})
            }
            const hashedPassword = await bcrypt.hash(password,3);
            existingUserByEmail.password=hashedPassword;
            existingUserByEmail.verificationCode=verifyCode;
            existingUserByEmail.verificationCodeExpiry=expiryDate;
            await existingUserByEmail.save();

        }else{

            const hashedPassword = await bcrypt.hash(password,3);
            const newUser = new UserModel({
                username,email,password : hashedPassword,
                verificationCode:verifyCode,
                verificationCodeExpiry:expiryDate,
                messages:[]

            });
            await newUser.save();
        }

        const emailResponse = await sendVerificationEmail(email,username,verifyCode)
        if(!emailResponse.success){
            return Response.json(
                {
                    success:false,
                    message:"Email verifivation not send or failed"+emailResponse.message
                },{
                    status:500
                }
            )
        }

        return Response.json(
            {
                success:true,
                message:"Email sent"+emailResponse.message
            },{
                status:200
            }
        )

    } catch (error) {
        console.log("Error under api "+error);
        return Response.json({
            success:false,
            message:"Error while posting "+error
        },{
            status:500
        })
    }
}