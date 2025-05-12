
import { Suspense } from "react"
import CardCompact from "@/components/card-compact"
import Heading from "@/components/heading"
import Spinner from "@/components/spinner"
import { getAuth } from "@/features/auth/actions/get-auth"
import TicketList from "@/features/ticket/components/ticket-list"
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert"


export const dynamic = "force-dynamic" 
// const revalidate = 30 re-validate data all 30s
 async function TicketsPage() {
 const {user} = await getAuth()

  

  return (
    
    <div className='flex-1 flex flex-col gap-y-8'>
      <Heading title="Tickets" description="All your tickets at once place"/>
        <CardCompact 
        title= "Create Ticket"
        description="A new ticket will be created"
        className="w-full max-w-[420px] self-center"
        content= {<TicketUpsertForm/>}
        
        />
        <Suspense fallback={<Spinner/>}>
            <TicketList userId={user.id}/>
         </Suspense>

      
       
        
    </div>
    
    
  )
}

export default TicketsPage