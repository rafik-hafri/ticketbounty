import { notFound } from "next/navigation"
import TicketItem from "@/features/ticket/components/ticket-item"
import { getTicket } from "@/features/ticket/queries/get-ticket"
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
    <>
    <div className="flex justify-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} isDetail/>
    </div>
    
    </>
  )
}
// this for tyrning this page into a static page
// export async function generateStaticParams(){
//   const tickets = await getTickets()
//   return tickets.map((ticket)=> ({
//     ticketId: ticket.id
//   }))
// }

export default TicketPage