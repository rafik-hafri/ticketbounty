import React from 'react'
import AccountTabs from '@/app/(authenticated)/account/_navigation/account-tabs'
import Heading from '@/components/heading'

function ProfilePage() {
  return (
    <div className='flex-1 flex flex-col gap-y-8'>
        <Heading title='profile' description='All your profile infrormation' 
        tabs= {
                <AccountTabs />
              }
        />
        

    </div>
  )
}

export default ProfilePage