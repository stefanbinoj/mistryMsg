import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export const authOptions : NextAuthOptions ={
    providers : [
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              },
            async authorize(credentials:any):Promise<any> {
                await dbConnect();
                try {
                   const user = await UserModel.findOne({
                    $or:[
                        {email:credentials.identifier},
                        {username:credentials.identifier}
                    ],
                   })
                   if(!user){
                    throw new Error("User NOt found");
                   } 
                   if(!user.isVerified){
                    throw new Error("Plse verify user")
                   }

                   const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password);
                   if(isPasswordCorrect){
                    console.log(user)
                    return user;
                   }
                   else{
                    throw new Error("Passwprd not match");
                   }
                } catch (error : any) {
                    throw new Error(error);
                }
            },
        }),
    ],
    callbacks:{
        async jwt({ token, user}) {
            if(user){
                token._id=user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessage = user.isAcceptingMessage
                token.username = user.username
                console.log("token is :",token)

            }
            return token
        },
        async session({ session, token }) {
            if(token){
                session.user._id=token._id;
                session.user.isVerified=token.isVerified
                session.user.isAcceptingMessage=token.isAcceptingMessage;
                session.user.username=token.username
                console.log("sessin is :",session)
            }
            return session
        },
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXT_AUTH_SECRET,
    pages : {
        signIn : '/sign-in'
    },
    
    }
