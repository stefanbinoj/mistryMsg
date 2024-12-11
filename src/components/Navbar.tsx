"use client"
import React, { useEffect, useState } from 'react'
import { useSession , signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Switch } from "@/components/ui/switch"
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

const Navbar = () => {
  const {toast} = useToast();
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

  const handleLogout = ()=>{
    toast({
      title:"Logout Completed",
      variant:"default"

    })
    signOut();
  }

    const { data : session } = useSession();
    const user : User = session?.user as User
    console.log("hamara user in nav is : ",user)
  return (
    <nav className={`pl-5 pr-0 py-5 mx-2 z-50 shadow-lg sticky top-0 backdrop-blur-sm border-b  ${isDarkMode ? 'bg-black/30 text-white border-gray-800' : 'bg-white text-black border-gray-300'}`}>
        <div className='container w-full 
        md:flex flex-row gap-4 items-center ml-5 w-screen justify-between '>
            <Link className={`font-bold text-xl ml-4 ${!isDarkMode?'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text':'bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text'} hover:scale-125 transition-all duration-300 ease-in-out`} href='/'>Mystery Message</Link>
            <div className=' hidden md:flex md:flex-row md:block w-3/5 gap-4 ml-auto mr-0 justify-end'>
              
              <a className=' cursor-pointer hover:scale-125 transition-all hover:font-bold duration-300 ease-in-out' href='/dashboard'>Dashboard</a>
              {session? <a className=' cursor-pointer  hover:scale-125 transition-all hover:font-bold duration-300 ease-in-out ' onClick={handleLogout}>Logout</a> 
                 : <a className=' cursor-pointer  hover:scale-125 transition-all hover:font-bold duration-300 ease-in-out ' href="/sign-in"> Loign
                </a>}
            </div>
            <div className="flex items-center space-x-2 ml-auto item-end cursor-pointer">
              <Switch className='hover:scale-125 transition-all duration-300 ease-in-out'   onCheckedChange={toggleTheme}  checked={isDarkMode} id="airplane-mode" />
            </div>
        </div>
    </nav>
  )
}

export default Navbar