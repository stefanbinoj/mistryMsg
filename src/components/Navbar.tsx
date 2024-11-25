"use client"
import React from 'react'
import Link from 'next/link'
import { useSession , signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'

const Navbar = () => {
    const { data : session } = useSession();

    const user : User = session?.user as User
    console.log("hamara user in nav is : ",user)
  return (
    <nav className='p-6 py-4 bg-slate-950	 text-white shadow-md'>
        <div className='container mx-auto flex flex-col 
        md:flex-row justify-between items-center '>
            <a className='font-bold ml-4' href='/'>Mystery Message</a>
            {   session ? 
                <>
                <span className='font-medium'>Welcome {user?.username || user?.email}</span>
                <Button onClick={()=>signOut()}>Logout</Button> 
                </>  : <><Link href="/sign-in">
                <Button className='bg-slate-200	' >Login</Button>
                </Link>
                </>
            }
        </div>
    </nav>
  )
}

export default Navbar