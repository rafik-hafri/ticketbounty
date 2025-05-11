import Link from "next/link"
import CardCompact from "@/components/card-compact"
import SignInForm from "@/features/auth/components/sign-in-form"
import {  passwordForgotPath, signUpPath } from "@/paths"

function SignInPage() {
   

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
        <CardCompact 
            title="Sign Up" 
            description="Create an acaount to get started" 
            className="w-full max-w-[420px] animate-fade-in-from-top" 
            content={<SignInForm/>} 
            footer={
                <div className="flex justify-between w-full">
                 <Link className="text-sm text-muted-foreground text-center" 
                 href={signUpPath()}>
                      Have an account? Sign In now.
                 </Link>
                 <Link className="text-sm text-muted-foreground text-center" 
                 href={passwordForgotPath()}>
                      Forgot Password?
                 </Link>
                </div>
            }
        />
</div>
  )
}

export default SignInPage