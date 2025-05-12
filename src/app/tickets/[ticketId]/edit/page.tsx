import { notFound } from "next/navigation"
import CardCompact from "@/components/card-compact"
import { getAuth } from "@/features/auth/actions/get-auth"
import { isOwner } from "@/features/auth/utils/is-owner"
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert"
import { getTicket } from "@/features/ticket/queries/get-ticket"

type TicketEditPageProps = {
    params: Promise<{
        ticketId: string
        }>
}

async function TicketEditPage({params}: TicketEditPageProps) {
    const {user} = await getAuth()
    const ticket = await getTicket((await params).ticketId)
    const isTicketOwner = isOwner(user, ticket)
    const isTicketFound = !!ticket
    if(!isTicketFound || !isTicketOwner) {
        notFound()
    }

  return (
    
    <div className="flex-1 flex flex-col justify-center items-center">
        <CardCompact title="Edit Ticket" description="Edit an existing ticket" className="w-full max-w-[420px] animate-fade-in-from-top" content={<TicketUpsertForm ticket={ticket}/>}/>
    </div>
    
  )
}

export default TicketEditPage