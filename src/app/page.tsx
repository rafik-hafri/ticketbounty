import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import Spinner from '@/components/spinner'
import TicketList from '@/features/ticket/components/ticket-list'
import { searchParamsCache } from '@/features/ticket/types'

export const dynamic = "force-dynamic" 

type HomePageProps = {
      searchParams: SearchParams
}
function HomePage({searchParams}: HomePageProps) {
  return (
<div className='flex-1 flex flex-col gap-y-8'>
     
      <Heading title="All Tickets" description="Tickets by everyone at one place"/>

      <Suspense fallback={<Spinner/>}>
            <TicketList searchParams={searchParamsCache.parse(searchParams)}/>
      </Suspense>
</div>  
)
}

export default HomePage