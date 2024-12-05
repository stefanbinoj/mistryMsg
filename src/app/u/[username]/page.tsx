"use client";
import React, { useEffect, useState } from "react";
import { useForm , SubmitHandler } from "react-hook-form";

type FormData = {
  textArea: string;
};

const page = () => {
  const [usernmae, setusername] = useState<string>("");
  useEffect(() => {
    const pathname = window.location.pathname.split("/");
    setusername(pathname[2]);
  }, []);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data :FormData) => console.log(data);


  return (
    <>
      <div className="md:py-10 md:px-20 flex flex-col  w-screen">
        <h1 className="text-3xl text-center md:text-4xl font-bold">
          Send Messages to unknown usernames !!
        </h1>
        <p className="text-xl mt-8">
          send anyonimous message to <a className="font-bold">{usernmae}</a>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea className="mt-5 w-full border-solid border-2 border-gray-500 py-3 px-3" rows={5} cols={5} placeholder="Write A messafe" {...register("textArea" , { required: true, minLength: 8 })} />
          {errors.textArea && <span>This field is required</span>}
          
          <button
            type="button"
            onClick={() => {
              setValue("textArea", ""); 
            }}
            className="bg-slate-900 text-white px-5 py-1 rounded-lg"
          > Send
            
          </button>
        </form>
      </div>
    </>
  );
};

export default page;
