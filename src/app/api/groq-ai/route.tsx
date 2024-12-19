import axios from "axios";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "consider you have an opportunity to randomly text an anyonomous person what would you message him ? provide 4 statements that are seperated by '||' just give me the 4 statements directly no introduction or conclusion is needed ",
      },
    ],
    model: "llama3-8b-8192",
  });
}


export async function GET(req:Request) {
    
    try {
        const chatCompletion = await getGroqChatCompletion();
       const Initialarray = chatCompletion.choices[0]?.message?.content?.split('||')
       const array = Initialarray?.join(' ').split('\n')
        return Response.json({
            success:true,
            message:array?.slice(-1)
        },{status:200})
    } catch (error) {
        return Response.json({
            success:false,
            message:"Failed to fetch from ai  "
        },{status:503})
    }
} 