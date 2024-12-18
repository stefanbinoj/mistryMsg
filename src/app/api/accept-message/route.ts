import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";


export async function POST(request:Request) {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        const user:User = session?.user as User

        if(!session || !session.user){
            return Response.json({
                success:false,
                message:"Not authenticated"
            },{status:401})
        }

        const userId = user._id
        const {acceptingMessages} = await request.json();

        try {
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId , 
                {isAcceptingMessage : acceptingMessages},
                {new:true}
            )

            if(!updatedUser){
                return Response.json({
                    success:false,
                    message:"User Not found"
                },{status:401})
            }
                return Response.json({
                    success:true,
                    message:"Accpetance flag updated ",
                    updatedUser
                },{status:200})
            
        } catch (error) {
            console.log("Eror while updating db toggle ")
            return Response.json({
                success:false,
                message:"Eror while updating db toggle"
             },{status:500})
        }

    } catch (error) {
        console.log("Eror while toggling ")
        return Response.json({
            success:false,
            message:"Error while toggling"
        },{status:500})
    }
}

export async function GET(request:Request) {
    const session = await getServerSession(authOptions);
    const user:User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not authenticated"
        },{status:401})
    }

    const userId = user._id

    try {
        const foundUser = await UserModel.findById(userId)
        if(!foundUser){
            console.log("User Not found")
            return Response.json({
                success:false,
                message:"User Not found"
            },{status:401})
        }
        return Response.json({
            success:true,
            message:"User  found",
            isAcceptingMessage : foundUser.isAcceptingMessage
        },{status:200})
    } catch (error) {
        console.log("Error getting status : "+error);
        return Response.json({
            success:false,
            message: "Error gettinf accpetance status : "+error
        },{status:500})
    }
}