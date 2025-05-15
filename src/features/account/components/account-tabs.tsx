"use client"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { accountPasswordPath, accountProfilePath } from '@/paths'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function AccountTabs() {
    const pathName = usePathname()
  return (
    <div>
        <Tabs value={pathName.split("/").at(-1)}>
           <TabsList>
                <TabsTrigger value='profile' asChild>
                    <Link href={accountProfilePath()}>
                        Profile
                    </Link>
                </TabsTrigger>
                <TabsTrigger value='password'>
                    <Link href={accountPasswordPath()}>
                        Password
                    </Link>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    </div>
  )
}

export default AccountTabs