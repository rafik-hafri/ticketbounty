import AccountTabs from '@/app/(authenticated)/account/_navigation/account-tabs'
import Heading from '@/components/heading'

function PasswordPage() {
  return (
    
    <div className='flex-1 flex flex-col gap-y-8'>
        <Heading title='profile' description='Keep ypur account secure' 
        tabs= {
                <AccountTabs />
              }
        />
        

    </div>
    
  )
}

export default PasswordPage