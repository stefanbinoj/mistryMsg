"use client";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/apiResponses";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea"

type FormData = {
  textArea: string;
};

const Page= () => {
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

  return (
    <>
      <div className="md:py-10 md:px-20 flex flex-col w-screen">
        <h1 className="text-3xl text-center md:text-4xl font-bold">
          Send Messages to unknown usernames !!
        </h1>
        <p className="text-xl mt-8">
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
            className="bg-slate-900 text-white px-5 py-1 rounded-lg"
            
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
