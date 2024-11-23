import mongoose from "mongoose";

export interface Message extends mongoose.Document{
    content:string;
    createdAt:Date;
}

const MessageSchema : mongoose.Schema<Message> = new mongoose.Schema({
    content:{
        required:true,
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export interface User extends mongoose.Document{
    username:string;
    email:string;
    password:string;
    verificationCode:string;
    isVerified:boolean;
    verificationCodeExpiry:Date;
    isAcceptingMessage:boolean;
    messages:Message[]
}

const UserSchema : mongoose.Schema<User> = new mongoose.Schema({
    username:{
        type:String,
        required:[true , "Please provide an username"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true , "Please provide an email"],
        unique:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide an valid email "]
        
    },
    password:{
        type:String,
        required:true
    },
    verificationCode:{
        type:String,
        required:[true , "verification code is required"]
    },
    verificationCodeExpiry:{
        type:Date,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    messages:[MessageSchema]
    
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User1",UserSchema)
export default UserModel;

