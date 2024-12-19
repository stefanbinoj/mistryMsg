"use client";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/apiResponses";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea"
import { BackgroundBeams } from "../../../components/ui/background-beams"
import { Cover } from "@/components/ui/cover";
import  HoverBorderGradientDemo  from "@/components/Aibutton";
import { SkeletonCard } from "@/components/ui/skeleton-loading";
import { CardHoverEffectDemo } from "@/components/AIMessageCard";

type FormData = {
  textArea: string;
};
type Item = {
  description: string;
};

const Page= () => {
  const [loading , setLoading] = useState<boolean>(false)
  const {toast} = useToast();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const pathname = window.location.pathname.split("/");
    setUsername(pathname[2]);
  }, []);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async(data : FormData) => {
    setValue("textArea", ""); 
      try {
          const result = await axios.post<ApiResponse>(`/api/send-message`,{
              username:username,
              content : data.textArea

          })
          if(result.status===400 ){
            toast({
              title:"Oopss",
              description:"user not receiving Messages now",
              variant:"destructive"
          })
          }
          else if(result.status===404){
            toast({
              title:"success",
              description:result.data.message,
              variant:"destructive"
          })
          }
          else{
            toast({
                title:"success",
                description:result.data.message
            })
          }

      } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          const errorMessage = axiosError.response?.data.message;
          toast({
              title:"Error",
              description : errorMessage,
              variant: "destructive"
          })
      }
  
  };
  useEffect(()=>{
    document.body.classList.add('dark');
  },[])
  const [aiMessages, setAIMessages] = useState<Item[]>([]);  // Store the list of AI messages

  const handleButtonClick = async () => {
    setLoading(true)
    try {
      const result = await axios.get<ApiResponse>('/api/groq-ai')
      const msg  =result.data.message[0].split('   ')
      const newArr = msg.map(item => ({
        description: item
      }));
      
      setTimeout(function() {
        setAIMessages(newArr)
      }, 2000);
    } catch (error) {
      console.log("eroor while frtching groq api  :",error);
            const axiosError = error as AxiosError<ApiResponse>
            toast({
              title:"Error",
              description : axiosError.response?.data.message || "Failed to fetch from ai  ",
              variant:"destructive"
            })
    }
  }

  useEffect(()=>{
    setLoading(false)
  },[aiMessages])
  

  return (
    <>
      <div className="md:px-20 flex flex-col w-screen ">
        {/* <h1 className="text-3xl text-center md:text-4xl font-bold">
          Send Messages to unknown usernames !!
        </h1> */}
        
      <div className="">
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Send Messages <br /> to <Cover>unknown usernames !!</Cover>
      </h1>
    </div>
      
        <p className="text-xl mt-8 mb-2">
          Send anonymous message to <span className="font-bold">{username}</span>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            className=" py-3 px-3"
            rows={5}
            cols={5}
            placeholder="Write A message"
            {...register("textArea", { required: true, minLength: 8 })}
          />
          {errors.textArea && <span className="text-red-500 block">This field is required and must be at least 8 characters long</span>}

          <button
            type="submit"
            className="bg-slate-900 text-white px-5 py-1 my-6 rounded-lg"
            
          >
            Send
          </button>
        </form>

      </div>
      <HoverBorderGradientDemo onClick={handleButtonClick} />
      <div className="flex justify-center">
      {loading ? <SkeletonCard /> : ''}
      </div>
      {!loading && aiMessages && aiMessages.length>0 ? 
      
        
        <CardHoverEffectDemo items={aiMessages}/> 
      
      : ''}
      
      <div className="min-h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to MailJet, the best transactional email service on the web.
          We provide reliable, scalable, and customizable email solutions for
          your business. Whether you&apos;re sending order confirmations,
          password reset emails, or promotional campaigns, MailJet has got you
          covered.
        </p>
        <input
          type="text"
          placeholder="hi@manuarora.in"
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
        />
      </div>
      <BackgroundBeams />
    </div>

    </>
  );
};

export default Page;
