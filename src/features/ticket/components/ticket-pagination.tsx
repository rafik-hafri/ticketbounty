import { useQueryStates } from 'nuqs'
import Pagination from '@/components/pagination'
import { paginationOptions, paginationParser } from '../types'


type TicketPaginationProps  = {
  paginatedTicketMetadata: {
    count:number
    hasNextPage: boolean
  }
}
function TicketPagination({paginatedTicketMetadata}: TicketPaginationProps ) {
    const [pagination, setPagination] = useQueryStates(paginationParser, paginationOptions)
  return (
    <Pagination pagination={pagination} onPagination={setPagination} paginatedMetadata={paginatedTicketMetadata}/>
  )
}

export default TicketPagination