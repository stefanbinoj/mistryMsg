import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from 'next-auth/providers/github';


export const authOptions : NextAuthOptions ={
    providers : [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            async profile(profile) : Promise<any> {
                await dbConnect(); 
                
                let user = await UserModel.findOne({
                    email:profile.email
                })

                console.log("User inside gh is : ",user)
                  
        
                if (!user) {
                  user = await UserModel.create({
                    email: profile.email,
                    username: profile.name ,
                    isVerified: true, // Assuming you trust Google email verification
                  });
                  console.log("New User Have been created")
        
                } else {
                  console.log("User exists")
                }
                return user;
              },
          }), 
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                  scope: 'openid profile email',
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            },
            async profile(profile) : Promise<any> {
                await dbConnect(); 
                console.log("profile is inn Google is : ",profile)
                
                let user = await UserModel.findOne({
                    email:profile.email
                })

                console.log("User inside Googg is : ",user)
                  
        
                if (!user) {
                  user = await UserModel.create({
                    email: profile.email,
                    username: profile.name ,
                    isVerified: true, // Assuming you trust Google email verification
                    googleId:profile.sub
                  });
                  
                  console.log("New User created")
        
                } else {
                  console.log("User already exists")
                }
                        return user;
              },
          }),
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
      
        async jwt({ token, user , account}) {
            
             if(user){
                token._id=user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessage = user.isAcceptingMessage
                token.username = user.username
                token.email=user.email
            }
            return token
        },
        async session({ session, token }) {
            if(token){
                session.user._id=token._id;
                session.user.isVerified=token.isVerified
                session.user.isAcceptingMessage=token.isAcceptingMessage;
                session.user.username=token.username
                session.user.email=token.email
            }
            return session
        },
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXT_AUTH_SECRET,
    // pages : {
    //     signIn : '/sign-in'
    // },
    
    }
