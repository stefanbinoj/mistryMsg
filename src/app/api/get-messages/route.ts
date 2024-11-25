import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request:Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user:User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not authenticated"
        },{status:401})
    }

    const userId = new mongoose.Types.ObjectId(user._id)

    try {
        const user = await UserModel.aggregate([
            {$match : {_id : userId} },
            {$unwind : "$messages"},
            {$sort : {'messages.createdAt' :-1}},
            {$group : {_id:'$_id' , messages : {$push : '$messages'}}}
        ])
        if(!user ){
            console.log("No user found : ");
            return Response.json({
                success:false,
                message: "No user " 
            },{status:400})
        }else if( user.length===0){
            console.log("user has no message to show   ");
            return Response.json({
                success:true,
                message: "No messages " 
            },{status:203})
        }
        return Response.json({
            success:true,
            message: "Messages found  ",
            messages : user[0].messages
        },{status:200})

    } catch (error) {
        console.log("Error getting messages : "+error);
        return Response.json({
            success:false,
            message: "Error gettinf accpetance messages : "+error
        },{status:500})
    }
}