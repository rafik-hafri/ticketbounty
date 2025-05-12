import Link from 'next/link'
import Heading from '@/components/heading'
import { ticketsPath } from '@/paths'
import { Suspense } from 'react'
import Spinner from '@/components/spinner'
import TicketList from '@/features/ticket/components/ticket-list'

function HomePage() {
  return (
<div className='flex*1 flex flex-col gap-y-8'>
     
      <Heading title="Home" description="Tickets by everyone at one place"/>

      <Suspense fallback={<Spinner/>}>
            <TicketList/>
      </Suspense>
</div>  
)
}

export default HomePage