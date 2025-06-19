import { inngest } from "@/lib/inggest";
import { prisma } from "@/lib/prisma";
import sendEmailVerificationt from "../emails/send-email-verification";
import { generateEmailVerification } from "../utils/generate-email-verification-code";

export type EmailVerificationEventArgs = {
    data: {
        userId: string
    }
}
export const emailVerificationEvent = inngest.createFunction(
    {id: "email-verification"},
    {event: "app/auth.sign-up"},
    async ({event}) => {
        const {userId} = event.data

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id:userId
            }
        })
         const verificationCode = await generateEmailVerification(user.id, user.email)
        const result = await sendEmailVerificationt(user.username, user.email, verificationCode)
        if(result.error) {
            throw new Error(`${result.error.name}: ${result.error.message}`)
        }
        return {event, body: result}
    }
)