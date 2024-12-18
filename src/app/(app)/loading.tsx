"use client"
import React, { useEffect, useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton";

const Loading = ()=> {
    const [Loading, setLoading] = useState(true);
      useEffect(() => {
        setLoading(true);
        const time = setTimeout(() => {
          setLoading(false);
        }, 1000);
        return () => clearTimeout(time);
      }, []);
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

export default Loading