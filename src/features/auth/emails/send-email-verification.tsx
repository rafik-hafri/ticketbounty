import EmailVerification from "@/emails/auth/email-verification"
import { getResendClient } from '@/lib/resend';

async function sendEmailVerificationt(userName: string, email:string, verificationCode: string) {
  const resend = getResendClient();
  return await resend.emails.send({
    from:"auth@rafikhafri.dev",
    to:email,
    subject: "Email verification from Ticketbounty",
    react:<EmailVerification toName={userName} code={verificationCode}/>
  })
}

export default sendEmailVerificationt