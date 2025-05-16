import SearchInput from "@/components/search-input"
import { getTickets } from "../queries/get-tickets"
import TicketItem from "./ticket-item"
import { SearchParams } from "../types"

type TicketListProps = {
  userId?: string | undefined
  searchParams: SearchParams
}
async function TicketList({userId, searchParams}: TicketListProps) {
    const tickets = await getTickets(userId, searchParams)
  return (
     <div className='flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top'>
        <div className="w-full max-w-[420px]"> 
          <SearchInput placeholder="Search tickets..."/>
        </div>
            {tickets.map((ticket)=> (
                <TicketItem key={ticket.id} ticket={ticket}/>
            ))}
    
    </div>
  )
}

export default TicketList