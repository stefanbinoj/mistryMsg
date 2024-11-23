import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { Message } from "@/models/User.model";

export async function POST(request:Request) {
    await dbConnect();

    const {username , content} =await request.json();
    try {
        const user = await UserModel.findOne({username})
        if(!user){
            return Response.json({
                success:false,
                message:"user not found"
            },{status:404})
        }
        const isUserAcceptingMessages = user.isAcceptingMessage
        if(!isUserAcceptingMessages){
            return Response.json({
                success:false,
                message:"user not accepting message at this point "
            },{status:400})
        }

        const newMessage = {content,createdAt : new Date() }
        user.messages.push(newMessage as Message)
        await user.save()

        return Response.json({
            success:true,
            message:"Messge sent successfully"
        },{status:201})
    } catch (error) {
        return Response.json({
                success:false,
                message:"Error  "+error
            },{status:500})
    }
}