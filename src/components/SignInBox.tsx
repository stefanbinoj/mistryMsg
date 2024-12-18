import {
  Card,
  CardContent,
  CardHeader,
} from "./ui/card"
import { Button } from "./ui/button"
import { parseAsBoolean, useQueryState } from "nuqs"
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react"
import { SiGmail } from "react-icons/si";
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

  
const Modal: React.FC = () => {
  const [isModal]  = useQueryState('modal',parseAsBoolean) || false
  const {toast} = useToast();

    if (!isModal) return null; 
    const handleEmailLogin = () =>{
      toast({
        title:"Oops !!",
        description : "Email Login Not possible at the current moment. Please try again later",
      })
    }
    

  
    return (
    <Card className="absolute inset-x-0 top-20 my-20 z-40 mx-auto max-w-md">
      <CardHeader>
        
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          
        
          <Button variant="outline" className="w-full" onClick={handleEmailLogin} >
          <SiGmail />
          Sign up with Email
          </Button>
          <Button variant="outline" className="w-full" onClick={()=>{signIn('google')}}>
          <FaGoogle />
            Sign up with Google
          </Button>
          <Button variant="outline" className="w-full" onClick={()=>{signIn('github')}}>
          <FaGithub />
            Sign up with GitHub
          </Button>
        </div>
        
      </CardContent>
    </Card>
  )
}

export default Modal;
