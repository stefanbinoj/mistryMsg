import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { messageId: string } }) {
    const { messageId } = params;  // Extract the messageId from params

    // Connect to the database
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not authenticated",
            },
            { status: 401 }
        );
    }

    try {
        // Update the user document by pulling the message with the specific messageId
        const updateResult = await UserModel.updateOne(
            { _id: user._id },
            { $pull: { messages: { _id: messageId } } }
        );

        if (updateResult.modifiedCount === 0) {
            return Response.json(
                {
                    success: false,
                    message: "Message not found",
                },
                { status: 403 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "Message deleted",
            },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Error deleting message",
            },
            { status: 500 }
        );
    }
}
