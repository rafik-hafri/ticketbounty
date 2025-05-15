import Heading from '@/components/heading'
import AccountTabs from '@/features/account/components/account-tabs'
import React from 'react'

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