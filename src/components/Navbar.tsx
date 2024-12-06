"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession , signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  // Check localStorage to persist the theme across page reloads
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.body.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    console.log("cahnge")
    setIsDarkMode(prev => {
      const newTheme = !prev;
      if (newTheme) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newTheme;
    });
  };

    const { data : session } = useSession();
    const user : User = session?.user as User
    console.log("hamara user in nav is : ",user)
  return (
    <nav className={`p-6 py-4 transparent shadow-lg mx-2 sticky top-0 backdrop-blur-sm ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} opacity-100`}>
        <div className='container mx-auto flex flex-col 
        md:flex-row justify-between items-center '>
            <a className='font-bold ml-4' href='/'>Mystery Message</a>
            {   session ? 
                <>

                <a  href='/dashboard' className='font-medium'>{window.location.pathname=='/' ? "Dashboard" : "Home"}</a>
                <Button onClick={()=>signOut()}>Logout</Button> 
                </>  : <><Link href="/sign-in">
                <Button className='bg-slate-200	' >Login</Button>
                </Link>
                </>
            }
            <div className="flex items-center space-x-2">
              <Switch   onCheckedChange={toggleTheme}  checked={isDarkMode} id="airplane-mode" />
              <Label htmlFor="airplane-mode">Dark Mode</Label>
            </div>
        </div>
    </nav>
  )
}

export default Navbar