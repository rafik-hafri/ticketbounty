import Link from "next/link"
import CardCompact from "@/components/card-compact"
import SignUpForm from "@/features/auth/components/sign-up-form"
import { signInPath } from "@/paths"

function SignUpPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
        <CardCompact 
        title="Sign Up" 
        description="Create an acaount to get started" 
        className="w-full max-w-[420px] animate-fade-in-from-top" 
        content={<SignUpForm/>} 
        footer={
          <Link className="w-full text-sm text-muted-foreground text-center" 
          href={signInPath()}>
            Have an account? Sign In now.
          </Link>
        }
          />
    </div>
  )
}

export default SignUpPage