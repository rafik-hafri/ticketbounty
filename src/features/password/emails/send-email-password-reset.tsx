import React from 'react'
import EmailPasswordReset from '@/emails/password/email-password-reset'
import { resend } from '@/lib/resend'

async function sendEmailPasswordReset(userName: string, email:string, passwordResetLink: string) {

  return await resend.emails.send({
    from:"auth@rafikhafri.dev",
    to:email,
    subject: "Password reset from Ticketbounty",
    react:<EmailPasswordReset toName={userName} url={passwordResetLink}/>
  })
}

export default sendEmailPasswordReset