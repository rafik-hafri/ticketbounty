import { getTickets } from "../queries/get-tickets"
import { ParsedSearchParams } from "../types"
import TicketItem from "./ticket-item"
import TicketSearchInput from "./ticket-search-input"
import TicketSortSelect from "./ticket-sort-select"

type TicketListProps = {
  userId?: string | undefined
  searchParams: ParsedSearchParams
}
async function TicketList({userId, searchParams}: TicketListProps) {
    const tickets = await getTickets(userId, searchParams)
  return (
     <div className='flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top'>
        <div className="w-full max-w-[420px] flex gap-x-2"> 
          <TicketSearchInput placeholder="Search tickets..."/>
          <TicketSortSelect 
           options= {
            [
              {
                sortKey: "createdAt",
                sortValue: "desc",
                label:"Newest"
              },
              {
                sortKey: "bounty",
                sortValue:"desc",
                label:"Bounty"
              }
            ]
           }
          />
        </div>
            {tickets.map((ticket)=> (
                <TicketItem key={ticket.id} ticket={ticket}/>
            ))}
    
    </div>
  )
}

export default TicketList