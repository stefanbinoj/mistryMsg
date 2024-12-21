"use client"
import { MessageCard } from '@/components/MessageCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { Message } from '@/models/User.model'
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema'
import { ApiResponse } from '@/types/apiResponses'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Loader2, RefreshCcw } from 'lucide-react'
import { User } from 'next-auth'
import { useSession } from 'next-auth/react'
import { parseAsBoolean, useQueryState } from 'nuqs'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import Loading from '../loading'

const Page= () => {
  const [messages , setMessages] = useState<Message[]>([])
  const [loading , setLoading ] = useState(false);
  const [switchLoading , setSwitchLoading] = useState(false)
  const [savedTheme] = useQueryState('dark', parseAsBoolean)

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
      if(!refresh){
        toast({
          title:"Refreshed Messages",
          description:"Your Message will be loaded right now "
        })
      }
      setSwitchLoading(false);
      setLoading(false)
      setMessages(result.data.messages || [])
      
      
    } catch (error) {
      console.log("eroor while frtching messages  :",error);
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title:"Error",
        description : axiosError.response?.data.message || "Failed to fetch Messages ",
        variant:"destructive"
      })
    }
    
  },[setLoading,setMessages])

  useEffect(()=>{
    if(!session || !session.user) return;
    fetchAllMessages();
    fetchIsAcceptingMessages()
  },[session,setValue , fetchAllMessages , fetchIsAcceptingMessages])


  //handle switch changes  : 
  const handleSwitchChange = async() =>{
    try {
      const result = await axios.post<ApiResponse>('/api/accept-message',{
        acceptingMessages : !acceptMessages
      })
      setValue('acceptMessages',!acceptMessages)
      toast({
        title:result.data.message,
        description:"Hurray updatedddd",
        variant:"default"
      })
    } catch (error) {
      console.log("eroor while switching   :",error);
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title:"Error",
        description : axiosError.response?.data.message || "Failed to switch toggle ",
        variant:"destructive"
      })
    }
  }
  if(!session || !session.user){
    return <div><Loading /></div>
  }

  const {username} = session.user as User
  const baseUrl = `${window.location.protocol}//${window.location.host}`
  const profileUrl = `${baseUrl}/u/${username}`

  const copyToClipboard = () =>{
    navigator.clipboard.writeText(profileUrl)
    toast({
      title:"copied"
    })
  }
  return (
    <div className={`my-8 mx-4 md:mx-8 lg:mx-auto p-6 rounded w-full max-w-6xl ${savedTheme ? 'bg-slate-950 text-white': 'bg-white text-slate-900'}`}>
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
        <div className="flex items-center">
          
          <Input className='p-2 mr-4 hover:bg-slate-400 border-solid border-2 border-slate-300' disabled value={profileUrl} type="text" placeholder="public url" />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={switchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? 'On' : 'Off'}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchAllMessages(true);
        }}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
          <Suspense fallback={<Loading/>} >
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={index}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          )) 
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
        </Suspense>
    </div>
  );
}

export default Page