import {User as AuthUser} from "lucia"
import {  LucideLock, LucideLogOut, LucideUser } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { signOut } from '@/features/auth/actions/sign-out'
import { accountPasswordPath, accountProfilePath } from '@/paths'
import { Avatar, AvatarFallback } from '../../components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'

type AccountDropdownProps = {
    user: AuthUser
}

function AccountDropdown({user}: AccountDropdownProps ) {
  return (
            <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar>
                        <AvatarFallback className='cursor-pointer'>
                            {user.username[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel className='text-sm font-semibold'>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                    <Link href={accountProfilePath()}>
                        <LucideUser className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                    <Link href={accountPasswordPath()}>
                        <LucideLock className="mr-2 h-4 w-4" />
                        <span>Password</span>
                    </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={()=> signOut()}>
                         <LucideLogOut className="mr-2 h-4 w-4" />
                         <span>Sign Out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
               
            </>

)
}

export default AccountDropdown