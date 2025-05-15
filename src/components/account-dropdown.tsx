import { signOut } from '@/features/auth/actions/sign-out'
import React from 'react'
import {User as AuthUser} from "lucia"
import {  LucideLock, LucideLogOut, LucideUser } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Avatar, AvatarFallback } from './ui/avatar'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from './ui/dropdown-menu'
import Link from 'next/link'
import { accountPasswordPath, accountProfilePath } from '@/paths'
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
                    <DropdownMenuItem asChild>
                    <form action={signOut}>
                        <LucideLogOut className="mr-2 h-4 w-4" />
                        <button type="submit">Sign Out</button>
                    </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
               
            </>

)
}

export default AccountDropdown