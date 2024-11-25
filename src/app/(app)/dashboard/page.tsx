"use client"
import { useToast } from '@/hooks/use-toast'
import { Message } from '@/models/User.model'
import React, { useState } from 'react'

const page = () => {
  const [messages , setMessages] = useState<Message[]>([])
  const [loading , setLoading ] = useState(false);
  const [switchLoading , setSwitchLoading] = useState(false)

  const {toast} = useToast();


  return (
    <div>htisnn is page</div>
  )
}

export default page