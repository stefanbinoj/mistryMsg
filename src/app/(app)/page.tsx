"use client";
import React, {  useState } from "react";
import Modal from "@/components/SignInBox";
import {Rate} from "antd"
import { InfiniteMovingCards } from "@/components/Carousal";
import { messages } from "@/helpers/Messages";
import { parseAsBoolean, useQueryState } from "nuqs";



const Page = () => {
  
  const [savedTheme] = useQueryState('dark', parseAsBoolean)

  

  return (
    <>
      <main className="relative flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-10 h-min-screen">
        <Modal />
        <section className="text-center mb-8 md:mb-12">
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
        </section>
        <InfiniteMovingCards items={messages} 
        
        />
        
        <div className="mt-5">
          <Rate disabled allowHalf defaultValue={4.5} />
          <p className="inline ml-2 text-slate-500">(45)</p>
        </div>
      </main>
    </>
  );
};

export default Page;
