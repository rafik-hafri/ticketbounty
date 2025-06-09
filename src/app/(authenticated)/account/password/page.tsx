import AccountTabs from '@/app/(authenticated)/account/_navigation/account-tabs'
import CardCompact from '@/components/card-compact'
import Heading from '@/components/heading'
import PasswordChangeForm from '@/features/password/components/password-change-form'

function PasswordPage() {
  return (
    
    <div className='flex-1 flex flex-col gap-y-8'>
        <Heading title='profile' description='Keep ypur account secure' 
        tabs= {
                <AccountTabs />
              }
        />
        <div className="flex-1 flex flex-col items-center">
        <CardCompact 
            title="Change Password" 
            description="Enter your current password" 
            className="w-full max-w-[420px] animate-fade-in-from-top" 
            content={<PasswordChangeForm/>} 
        />
     </div>
        

    </div>
    
  )
}

export default PasswordPage