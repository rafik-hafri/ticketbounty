"use client"
import Link from "next/link"
import { useActionState } from "react"
import FieldError from "@/components/form/field-error"
import Form from "@/components/form/form"
import { SubmitButton } from "@/components/form/submit-button"
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state"
import { Input } from "@/components/ui/input"
import { passwordForgotPath } from "@/paths"
import { passwordReset } from "../actions/password-reset"

type PasswordForgotFormProps = {
  tokenId: string
}

function PasswordForgotForm({tokenId}:PasswordForgotFormProps ) {
    const [actionState, action] = useActionState(passwordReset.bind(null, tokenId), EMPTY_ACTION_STATE)
  return (
    <Form action={action} actionState={actionState}>
        <Input type="password" name="password" placeholder="Password" defaultValue={(actionState.payload?.get("password") as string)}/>
        <FieldError actionState={actionState} name="password"/>
        <Input type="password" name="confirmPassword" placeholder="Confirm Password" defaultValue={(actionState.payload?.get("confirmPassword") as string)}/>
        <FieldError actionState={actionState} name="confirmPassword"/>
        <Link className="text-sm text-muted-foreground flex justify-end" 
          href={passwordForgotPath()}>
          Forgot Password?
        </Link>
       
        <SubmitButton label="Reset Password"/>
    </Form>

  )
}

export default PasswordForgotForm