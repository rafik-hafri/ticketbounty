"use client"
import { LucideKanban } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { homePath, signInPath, signUpPath } from '@/paths'
import AccountDropdown from './account-dropdown'
import ThemeSwitcher from './theme/theme-switcher'
import {  buttonVariants } from './ui/button'

 function Header() {
 const {user, isFetched} = useAuth()
 
  if(!isFetched){
    return null
  }
  const navItems  = user ? (
    <>
      
      <AccountDropdown user={user}/>
      </>
  ) : (
     <>
      <Link href={signUpPath()} className={buttonVariants({variant: "default", size:"xs", className:"text-xs md:text-sm"})} >Sign Up</Link>
      <Link href={signInPath()} className={buttonVariants({variant: "default", size:"xs",className:"text-xs md:text-sm"})} >Sign In</Link>
    </>
  )
  return (
  <nav className="h-16 animate-header-from-top supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex px-5 justify-between items-center">
    <div className='flex align-items gap-x-2'>
    
      <Link href={homePath()} className={buttonVariants({variant: "ghost"})}>
      <LucideKanban/>
      <h1 className=" text-xs md:text-lg font-semibold ml-2">
      TicketBounty
      </h1>
      </Link>
      
    </div>
    <div className='flex align-items gap-x-2'>
      <ThemeSwitcher/>
    {navItems}     
    </div>
  </nav>
  )
}

export default Header