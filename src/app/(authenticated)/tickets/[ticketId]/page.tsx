import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Separator } from "@/components/ui/separator"
import Comments from "@/features/comment/components/comment"
import { getComments } from "@/features/comment/queries/get-comments"
import TicketItem from "@/features/ticket/components/ticket-item"
import { getTicket } from "@/features/ticket/queries/get-ticket"
import { homePath } from "@/paths"

 type TicketPageProps = {
    params : Promise<{
ticketId: string
}>
}
async function TicketPage({params}: TicketPageProps) {
    const ticketPromise =  getTicket( (await params).ticketId)
    const commentsPromise =  getComments((await params).ticketId)
    const [ticket, paginatedComments] = await Promise.all([ticketPromise, commentsPromise])
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
      <TicketItem ticket={ticket} 
      isDetail 
      // comments={comments}
          // Passing <Comments /> as a prop here ensures it is rendered on the server.
          // If we had rendered <Comments /> directly inside the TicketItem component,
          // which is a Client Component (because it includes interactive elements like menus),
          // it would force <Comments /> to be treated as a Client Component too.
          // This approach avoids unnecessary client-side rendering for Comments.
      comments={<Comments ticketId={ticket.id} paginatedComments={paginatedComments}/>}
      />
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