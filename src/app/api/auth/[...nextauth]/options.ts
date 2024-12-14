import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import GoogleProvider from "next-auth/providers/google";


export const authOptions : NextAuthOptions ={
    providers : [ 
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            },
            async profile(profile) {
                await dbConnect(); 
        
                let user = await UserModel.findOne({
                    $or:[
                        {email:profile.email},
                        {username:profile.name}
                    ],
                   })
                console.log('user inside gogle is ',user)
                  
        
                if (!user) {
                  // If user doesn't exist, create a new user
                  user = await UserModel.create({
                    email: profile.email,
                    username: profile.name ,
                    //image: profile.picture, // Optional: Use profile picture
                    //googleId: profile.id, // Store the Google ID
                    isVerified: true, // Assuming you trust Google email verification
                  });
        
                  console.log("User created:", user);
                } else {
                  console.log("User already exists:", user);
                }
        
                // Return the profile, and it will be available in session and JWT
                return profile;
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
                    console.log("user inside options is ",user)
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
            if (account && token?.sub !== account.providerAccountId) {
                console.log("insdie google authenticagtion method  : ");
                token.id = account.providerAccountId;
                //token.email = account.email;

            }
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
    // pages : {
    //     signIn : '/sign-in'
    // },
    
    }
