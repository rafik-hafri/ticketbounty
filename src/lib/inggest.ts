import {EventSchemas, Inngest} from "inngest"
import { passwordResetEventArgs } from "@/features/password/events/event-password-reset"

type Events = {
    "app/password.password-reset": passwordResetEventArgs
}
export const inngest = new Inngest({
    id:"ticketbounty",
    schemas: new EventSchemas().fromRecord<Events>()

})
