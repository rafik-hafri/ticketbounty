"use client"
import Link from "next/link"
import { useActionState } from "react"
import FieldError from "@/components/form/field-error"
import Form from "@/components/form/form"
import { SubmitButton } from "@/components/form/submit-button"
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state"
import { Input } from "@/components/ui/input"
import { passwordForgotPath } from "@/paths"
import { signIn } from "../actions/sign-in"

function SignInForm() {
    const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE)
  return (
    <Form action={action} actionState={actionState}>
        <Input name="email" placeholder="Email" defaultValue={(actionState.payload?.get("email") as string)}/>
        <FieldError actionState={actionState} name="email"/>
        <Link className="text-sm text-muted-foreground flex justify-end" 
          href={passwordForgotPath()}>
          Forgot Password?
        </Link>
        <Input name="password" placeholder="Password" type="password" />
        <FieldError actionState={actionState} name="password"/>
        <SubmitButton label="Sign In"/>
    </Form>

  )
}

export default SignInForm