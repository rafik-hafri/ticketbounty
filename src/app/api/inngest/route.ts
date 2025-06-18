import {serve} from "inngest/next" 
import { passwordResetEvent } from "@/features/password/events/event-password-reset"
import { inngest } from "@/lib/inggest"

export const { GET, POST, PUT } = serve({
    client: inngest, 
    functions: [passwordResetEvent]
})