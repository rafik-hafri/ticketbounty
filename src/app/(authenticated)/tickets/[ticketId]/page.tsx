import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Separator } from "@/components/ui/separator"
import TicketItem from "@/features/ticket/components/ticket-item"
import { getTicket } from "@/features/ticket/queries/get-ticket"
import { homePath } from "@/paths"
// import { getTickets } from "@/features/ticket/queries/get-tickets"

 type TicketPageProps = {
    params : Promise<{
ticketId: string
}>
}
async function TicketPage({params}: TicketPageProps) {
    const ticket = await getTicket( (await params).ticketId)
    if(!ticket) {
        return notFound()
    }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
    <Breadcrumbs breadcrumbs={[
      {title: "Tickets", href:homePath()},
      {title: ticket.title}
    ]}/>
    <Separator/>
    <div className="flex justify-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} isDetail/>
    </div>
    
    </div>
  )
}
// this for turning this page into a static page
// export async function generateStaticParams(){
//   const tickets = await getTickets()
//   return tickets.map((ticket)=> ({
//     ticketId: ticket.id
//   }))
// }

export default TicketPage