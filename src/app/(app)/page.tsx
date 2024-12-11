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
function SkeletonDemo() {
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

const Page = () => {
  const savedTheme : string  =  'white';
    
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
        <h1
  className="text-3xl md:text-5xl font-bold shadow-lg"
  style={savedTheme === 'dark'
    ? { textShadow: "1px 30px 4px rgba(255, 255, 255, 0.4)", transition: "text-shadow 10s ease-in-out", color: '#e0e0e0' }  // Dark theme styles with lighter text color
    : { textShadow: "1px 30px 4px rgba(0, 0, 0, 0.4)", transition: "text-shadow 10s ease-in-out", color: '#333333' } // Light theme styles with darker text color
  }
>
  Dive into the World of Anonymous Feedback
</h1>

          <p className="mt-10 md:mt-17 text-base md:text-xl font-bold">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>
        

        <Carousel
        plugins={[AutoPlay({delay:2000})]}
        className=" max-w-xs ">
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

export default Page