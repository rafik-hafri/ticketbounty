"use server"
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import sendEmailVerificationt from "../emails/send-email-verification";
import { getAuthOrRedirect } from "../queries/get-auth-or-redirect";
import { generateEmailVerification } from "../utils/generate-email-verification-code";

export const emailVerificationResend  = async (
    _actionState: ActionState,
    formData: FormData
) => {
    const {user} = await getAuthOrRedirect({
        checkEmailVerified:false
    })
    try {
        const verificationCode = await generateEmailVerification(user.id, user.email)
        const result = await sendEmailVerificationt(user.username, user.email, verificationCode)
        if(result.error) {
            return toActionState("ERROR", "Failed to send verification email")
        }
    }catch (error) {
        return fromErrorToActionState(error, formData)
    }
    return toActionState("SUCCESS", "verification email has been sent")
}   