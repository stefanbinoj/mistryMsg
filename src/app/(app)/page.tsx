"use client";
import React, {  useState } from "react";

import Modal from "@/components/SignInBox";
import { Rate } from 'antd';
import Footer from "@/components/Footer";
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '60px',
  color: 'red',
  lineHeight: '16px',
  textAlign: 'center',
  background: '#ffffff',
};


const Page = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const savedTheme: string = "white";

  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-10 h-min-screen">
        <Modal isOpen={isModalOpen} onClose={closeModal} />
        <section className="text-center mb-8 md:mb-12">
          <h1
            className="text-3xl md:text-5xl font-bold shadow-lg"
            style={
              savedTheme === "dark"
                ? {
                    textShadow: "1px 30px 4px rgba(255, 255, 255, 0.4)",
                    transition: "text-shadow 10s ease-in-out",
                    color: "#e0e0e0",
                  } // Dark theme styles with lighter text color
                : {
                    textShadow: "1px 30px 4px rgba(0, 0, 0, 0.4)",
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
        <Carousel afterChange={onChange}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
        
        <div className="mt-5">
          <Rate allowHalf defaultValue={2.5} />
          <p className="inline ml-2 text-slate-500">(45)</p>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Page;
