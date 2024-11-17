import {resend} from "@/lib/resend"
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/apiResponses";

export async function sendVerificationEmail(
    username : string,
    verificationCode : string,
    email : string
):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mystery Message | Verification Code',
            react: VerificationEmail({username , otp:verificationCode}),
          });

        return {message:"Email send succesfully", success:true}
    } catch (error) {
        console.log("Eror sending verification email  : "+error)
        return {message:"Error Failed to send email " +error , success:false}
    }
}