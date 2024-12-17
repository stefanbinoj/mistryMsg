import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { parseAsBoolean, useQueryState } from "nuqs"

interface ModalProps {
    onClose: () => void;
    isOpen: boolean;
  }
  
const Modal: React.FC = () => {
  const [isModal]  = useQueryState('modal',parseAsBoolean) || false
  
    if (!isModal) return null; 
    console.log("Modal here is",isModal)
  
    return (
    <Card className="absolute inset-x-0 top-0 my-20 z-40 mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="#" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default Modal;
