"use client"
import React, { useEffect, useState } from 'react'
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

import { Skeleton } from "@/components/ui/skeleton"
 
export function SkeletonDemo() {
  return (
    <div className="flex flex-col space-y-3 mt-8 ml-80">
      <Skeleton className="min-h-max min-w-max rounded-full" />
      <div className="space-y-4">
        <Skeleton className="h-80 w-[800px] " />
        <Skeleton className="h-10 w-[800px] " />
      </div>
    </div>
  )
}

const page = () => {
  const [loading , setloading] = useState(true)
  useEffect(()=>{
    setloading(true)
    const time = setTimeout(()=>{
      console.log("waiting period")
      setloading(false)
    },1000)
    return () => clearTimeout(time)  
  },[])
  return (
    <>{ loading ? (<SkeletonDemo />):(<>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-10 h-min-screen">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold shadow-lg"
            style={{ textShadow: "1px 30px 4px rgba(255, 255, 255, 0.4)" , transition: "text-shadow 10s ease-in-out" }}          >
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-5 md:mt-7 text-base md:text-lg">
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
  </>)}
    </>
  )
}

export default page