"use client";
import React, {  Suspense, useState } from "react";
import Modal from "@/components/SignInBox";
import {Rate} from "antd"
import { InfiniteMovingCards } from "@/components/Carousal";
import { messages } from "@/helpers/Messages";
import { parseAsBoolean, useQueryState } from "nuqs";
import { BackgroundLines } from "@/components/ui/background-lines";
import Loading from "./loading";



const Page = () => {
  

  

  return (
    <>
      <main className="relative flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-10 h-min-screen">
      <Suspense fallback={<Loading/>} >
        <Modal />
      </Suspense>
        {/* <section className="text-center mb-8 md:mb-12">
          <h1
          className="text-3xl md:text-5xl font-bold "
          style={
            savedTheme
            ? {
              transition: "text-shadow 10s ease-in-out",
              color: "#e0e0e0",
              } // Dark theme styles with lighter text color
              : {
                transition: "text-shadow 10s ease-in-out",
                color: "#333333",
                } // Light theme styles with darker text color
                }
                >
                Dive into the World of Anonymous Feedback
                </h1>
                
                <p className="mt-10 md:mt-17 text-base md:text-xl font-bold">
                True Feedback - Where your identity remains a secret.
                </p>
                </section> */}
                <Suspense fallback={<Loading/>} >
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Anonymous Messages, <br />  Feedbacks.
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
      Send your thoughts, secrets, or words of encouragement anonymously with ease. Express yourself freely and connect without revealing your identity.
      </p>
    </BackgroundLines>
    </Suspense>
    <Suspense fallback={<Loading/>} >
        <InfiniteMovingCards items={messages}     />
        </Suspense>
        <div className="mt-5">
    <Suspense fallback={<Loading/>} >
          <Rate disabled allowHalf defaultValue={4.5} />
        </Suspense>
          <p className="inline ml-2 text-slate-500">(45)</p>
        </div>

      </main>
    </>
  );
};

export default Page;
