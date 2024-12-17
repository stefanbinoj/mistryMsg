"use client";
import React, {  useState } from "react";
import AutoPlay from "embla-carousel-autoplay";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card"
import Modal from "@/components/SignInBox";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {Rate} from "antd"



const Page = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 200, stopOnInteraction: true })
  )
  
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
        <Carousel
      plugins={[AutoPlay({ delay: 2000 })]} 
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
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
