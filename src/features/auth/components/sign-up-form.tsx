"use client"
import { SubmitButton } from "@/components/form/submit-button"
import { Input } from "@/components/ui/input"
import { signUp } from "../actions/sign-up"
import { useActionState } from "react"
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state"
import Form from "@/components/form/form"
import FieldError from "@/components/form/field-error"

function SignUpForm() {
    const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE)
  return (
    <Form action={action} actionState={actionState}>
        <Input name="username" placeholder="Username" defaultValue={(actionState.payload?.get("username") as string)}/>
        <FieldError actionState={actionState} name="username"/>
        <Input name="email" placeholder="Email" defaultValue={(actionState.payload?.get("email") as string)}/>
        <FieldError actionState={actionState} name="email"/>
        <Input name="password" placeholder="Password" type="password" />
        <FieldError actionState={actionState} name="password"/>
        <Input name="confirmPassword" placeholder="confirm password" type="passsword"/>
        <FieldError actionState={actionState} name="confirm password"/>
        <SubmitButton label="Sign Up"/>
    </Form>

  )
}

export default SignUpForm