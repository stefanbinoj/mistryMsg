import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { use } from "react";

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
                    ]
                   })
                   if(!user){
                    throw new Error("User NOt found");
                   } 
                   if(!user.isVerified){
                    throw new Error("Plse verify user")
                   }

                   const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password);
                   if(isPasswordCorrect){
                    return user;
                   }
                   else{
                    throw new Error("Passwprd not match");
                   }
                } catch (error : any) {
                    throw new Error(error);
                }
            }
        })
    ],
    callbacks:{
        async jwt({ token, user}) {
            return token
        },
        async session({ session, token }) {
            return session
        }
    },
    pages : {
        signIn : '/sign-in'
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXT_AUTH_SECRET,
    
    }
