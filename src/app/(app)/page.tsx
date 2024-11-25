"use client"
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import messages from "@/messages.json"
import AutoPlay from "embla-carousel-autoplay"
const page = () => {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12  text-blsck">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>
        

        <Carousel
        plugins={[AutoPlay({delay:1500})]}
        className="w-full max-w-xs">
      <CarouselContent>
        {
          messages.map((msg , index)=>{
            return (
              <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardHeader>{msg.title}</CardHeader>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                <p>{msg.content}</p>
                </CardContent>
                <CardFooter>{msg.received}</CardFooter>
              </Card>
            </div>
          </CarouselItem>
            )
          })
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </main>
    </>
  )
}

export default page