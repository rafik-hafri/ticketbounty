"use client"
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { cn } from '@/lib/utils'
import { signInPath, signUpPath } from '@/paths'
import { getActivePath } from '@/utils/get-actuive-path'
import { navItems } from '../constants'
import SidebarItem from './sidebar-item'

function Sidebar() {
    const {user, isFetched} = useAuth()
    const pathName = usePathname()
    const {activeIndex} = getActivePath(pathName, navItems.map((item) => item.href),[signInPath(), signUpPath()])
    const [isTransition, setTransition] = useState(false)
    const [isOpen, setOpen] = useState(false)
    
    const handleToggle = (open: boolean) => {
        setTransition(true)
        setOpen(open)
        setTimeout(() => setTransition(false), 200)
    }
      if(!user || !isFetched){
        // return <div className='w-[78px] bg-secondary/28'/>
    }
  return (
    <nav className={cn(
        "animate-sidebar-from-left",
        "h-screen border-r mt-16 bg-secondary/28",
        isTransition && "duration-200",
        isOpen ? "md:w-60 w-[65px]" : "w-[65px]",
        !user && "hidden"
    )}
    // style={{ height: 'calc(100vh - 64px)' }}
    onMouseEnter={() => handleToggle(true)}
    onMouseLeave={() => handleToggle(false)}
    >
    
        <div className="px-3 py-2"> 
            <nav className="space-y-2">
                {navItems.map((navItem, index) => (
                    <SidebarItem key={navItem.title} 
                    isOpen={isOpen}
                    navItem={navItem}
                    isActive={activeIndex === index}
                    />
                ))}

            </nav>
        </div>

    </nav>
  )
}

export default Sidebar