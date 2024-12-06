import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { Message } from "@/models/User.model";
import { ApiResponse } from "@/types/apiResponses";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { json } from "stream/consumers";

export async function DELETE(request: Request ,{params} : {params: {messageId:string}} ) {
    // Connect to the database
    const messageId = params.messageId
    console.log(messageId)
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user:User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not authenticated"
        },{status:401})
    }

    try {
        const updateResult = await UserModel.updateOne(
            {_id:user._id},
            {$pull:{messages: {_id:messageId}}}
        )
        if(updateResult.modifiedCount == 0){
            return Response.json({
                success:false,
                message:"Mesage not found"
            },{status:404})
        }
        return Response.json({
            success:true,
            message:"Message deleted"
        },{status:200})
    } catch (error) {
        console.log("Error whle deleting : ",error)
        return Response.json({
            success:false,
            message:"Error deleting message"
        },{status:500})
    }

}

