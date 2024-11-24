'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios , {AxiosError} from "axios"
import { ApiResponse } from "@/types/apiResponses"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { signInShema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"


const page = () => {

  const [isSubmitting , setIsSubmitting] = useState(false);
  
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof signInShema>>({
    resolver : zodResolver(signInShema),
    defaultValues : {
      identifier:'',
      password:''
    }
  })
  const onSubmit = async(data :z.infer<typeof signInShema>) =>{
    setIsSubmitting(true)

    const result = await signIn('credentials',{
      redirect:false,
      identifier:data.identifier,
      password:data.password
    })
    console.log(result)
    setIsSubmitting(false)
    if(result?.error){
      toast({
        title:"SignIN failed",
        description:result.error,
        variant:"destructive"
      })
    }
    if(result?.url){
      console.log("Insice repa")
      router.replace('/dashboard')
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
            name="identifier"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username / Email</FormLabel>
                <Input placeholder="username" {...field} />
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
      
    </div>
  </div>
);
}
export default page