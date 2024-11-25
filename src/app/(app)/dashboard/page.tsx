"use client"
import { useToast } from '@/hooks/use-toast'
import { Message } from '@/models/User.model'
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema'
import { ApiResponse } from '@/types/apiResponses'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const page = () => {
  const [messages , setMessages] = useState<Message[]>([])
  const [loading , setLoading ] = useState(false);
  const [switchLoading , setSwitchLoading] = useState(false)

  const {toast} = useToast();

  const handleDeleteMessage = async(messageId : string) =>{
    setMessages(messages.filter((msg)=>msg._id!==messageId))
  }

  const {data : session} = useSession()

  const form = useForm({
    resolver:zodResolver(acceptMessageSchema)
  })

  const {register , watch , setValue} = form;
  const acceptMessages = watch('acceptMessages')

  const fetchIsAcceptingMessages = useCallback(async()=>{
    setSwitchLoading(true)
    try {
      const result = await axios.get<ApiResponse>('/api/accept-message')
      setValue('acceptMessages',result.data.isAcceptingMessage)
    } catch (error) {
      console.log("eroor while frtching status of swithc  :",error);
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title:"Error",
        description : axiosError.response?.data.message || "Failed to fetch status of seitch ",
        variant:"destructive"
      })
    }
    finally{
      setSwitchLoading(false);
    }
  },[setValue])

  const fetchAllMessages = useCallback(async(refresh : boolean = false)=>{
    setLoading(true)
    setSwitchLoading(false)
    try {
      const result =await axios.get<ApiResponse>('/api/get-messages')
      setMessages(result.data.messages || [])
      if(refresh){
        toast({
          title:"Refreshed Messages",
          description:"Your Message will be loaded right now "
        })
      }
      
    } catch (error) {
      console.log("eroor while frtching messages  :",error);
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title:"Error",
        description : axiosError.response?.data.message || "Failed to fetch Messages ",
        variant:"destructive"
      })
    }
    finally{
      setSwitchLoading(false);
      setLoading(false)
      if(messages.length==0){
        toast({
          title:"OOpsss !! no message",
          description:"Looks lke no one sent message , come again lateer chief !!"
        })
      }
    }
  },[setLoading,setMessages])

  useEffect(()=>{
    if(!session || !session.user) return;
    fetchAllMessages();
    fetchIsAcceptingMessages()
  },[session,setValue , fetchAllMessages , fetchIsAcceptingMessages])


  //handle switch changes  : 
  
  return (
    <div>htisnn is page</div>
  )
}

export default page