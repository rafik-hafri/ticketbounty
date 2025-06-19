import {EventSchemas, Inngest} from "inngest"
import { EmailVerificationEventArgs } from "@/features/auth/events/event-email-verification"
import { passwordResetEventArgs } from "@/features/password/events/event-password-reset"

type Events = {
    "app/password.password-reset": passwordResetEventArgs
    "app/auth.sign-up": EmailVerificationEventArgs
}
export const inngest = new Inngest({
    id:"ticketbounty",
    schemas: new EventSchemas().fromRecord<Events>()

})
