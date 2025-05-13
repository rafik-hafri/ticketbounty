import Link from "next/link"
import CardCompact from "@/components/card-compact"
import SignInForm from "@/features/auth/components/sign-in-form"
import { signUpPath } from "@/paths"

function SignInPage() {
   
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
        <CardCompact 
            title="Sign In" 
            description="Sign in with your account to get started" 
            className="w-full max-w-[420px] animate-fade-in-from-top" 
            content={<SignInForm/>} 
            footer={
                 <Link className="w-full text-sm text-muted-foreground text-center" 
                 href={signUpPath()}>
                      Dont Have an account? Sign Up now.
                 </Link>
                
            }
        />
</div>
  )
}

export default SignInPage