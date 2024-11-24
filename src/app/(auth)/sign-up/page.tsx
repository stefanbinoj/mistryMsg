'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import {useDebounceValue} from "usehooks-ts"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios , {AxiosError} from "axios"
import { ApiResponse } from "@/types/apiResponses"
import { title } from "process"
import { Description } from "@radix-ui/react-toast"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"


const page = () => {
  const [username , setUsername] = useState("")
  const [usernameMessage , setUsernameMessage] = useState('')
  const [isCheckingUsername , setIsCheckingUsername] = useState(false)
  const [isSubmitting , setIsSubmitting] = useState(false);
  
  const debouncedUsername = useDebounceValue(username,500000)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver : zodResolver(signUpSchema),
    defaultValues : {
      username:'',
      email:'',
      password:''
    }
  })

  useEffect(()=>{
    const checkUsernameUnique = async() =>{
      if(debouncedUsername){
        console.log("Username debounce is : ",debouncedUsername)
        setIsCheckingUsername(true)
        setUsernameMessage('');
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`)
          console.log(response)
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(axiosError.response?.data.message || "Error checking usernmae unique")
        }
        finally{
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsernameUnique();
  },[debouncedUsername])

  const onSubmit = async(data :z.infer<typeof signUpSchema>) =>{
    setIsSubmitting(true)
    try {
      const response =await axios.post<ApiResponse>(`/api/sign-up`,data)
      console.log("data for signuo is  : ",data);
      console.log("response for signup is : ",response)
      toast({
        title:'Success',
        description:response.data.message
      })
      router.replace(`/verify/?username=${username}`)
      setIsSubmitting(false)

    } catch (error) {
      console.log("error in signup of user " , error)
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast:({
        title:"Error",
        description : errorMessage,
        variant: "destructive"
      })
      setIsSubmitting(false)
      }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Welcome Back to True Feedback
        </h1>
        <p className="mb-4">Sign in to continue your secret conversations</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <Input placeholder="username" {...field} onChange={(e)=>{
                  field.onChange(e);
                  setUsername(e.target.value);
                }}/>
                {isCheckingUsername && <Loader2 className="mr-4 h-4 w-4 animate-spin" />}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input placeholder="email@gmail.com" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input placeholder="password" type="password" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full' type="submit" disabled={isSubmitting}>{
            isSubmitting ?  (
              <>
                <Loader2 className="mr-4 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : ("Sign IN") 
            }</Button>
        </form>
      </Form>
      <div className="text-center mt-4">
        <p>
          Not a member yet?{' '}
          <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}
export default page