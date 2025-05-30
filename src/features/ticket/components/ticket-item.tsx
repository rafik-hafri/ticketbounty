import clsx from "clsx"
import { LucideMoreVertical, LucidePencil, LucideSquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ticketEditPath, ticketPath } from '@/paths'
import { toCurrencyFromCent } from '@/utils/currency'
import { TICKET_ICONS } from '../constants'
import { TicketWithMetadata } from '../types'
import TicketMoreMenu from './ticket-more-menu'


type TicketItemProps = {
   ticket: TicketWithMetadata
   isDetail?: boolean,
   comments?: React.ReactNode
}
function TicketItem({ticket, isDetail, comments}: TicketItemProps) {
    const editButton = ticket.isOwner ? (
        <Button variant="outline" size="icon" asChild> 
            <Link prefetch href={ticketEditPath(ticket.id)}>
                <LucidePencil className="h-4 w-4"/>
            </Link>
        </Button>
    ) : null 
    const detailButton = (
        <Button variant="outline" size="icon" asChild>
                <Link prefetch href={ticketPath(ticket.id)} >
                    <LucideSquareArrowOutUpRight className='h-4 w-4'/>
                </Link>
         </Button>
    )
 

    // const deleteButton = ( 
    //     <ConfirmDialog action={deleteTicket.bind(null, ticket.id)} trigger= {            
    //                 <Button variant="outline" size="icon" >
    //                     <LucideTrash className='h-4 w-4'/>
        
    //                 </Button>
    //     }
    //         />
    // )

    const moreMenu = ticket.isOwner ? ( <TicketMoreMenu ticket={ticket} trigger={
            <Button variant="outline" size="icon">
            <LucideMoreVertical className="h-4 w-4"/>
            </Button>
    }/>) : null

  return (
    <div className={clsx("w-full flex flex-col gap-y-4", {
            "max-w-[420px]": !isDetail,
            "max-w-[580px]": isDetail
        })}>
        <div className='flex flex-1 w-full gap-x-2'>
                <Card  className='w-full max-w-[580px]'> 
                    <CardHeader>
                        <CardTitle className="flex gap-x-2">
                            <span>{TICKET_ICONS[ticket.status]}</span>
                            <span className='truncate'>{ticket.title}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className={clsx(" whitespace-break-spaces", {
                            "line-clamp-3": !isDetail
                        })}>{ticket.content}</span>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <p className="text-sm text-muted-foreground">
                        {ticket.deadline} by {ticket.user.username}
                        </p>
                        <p className="text-sm text-muted-foreground">
                        {toCurrencyFromCent(ticket.bounty)}
                        </p>
                    </CardFooter>
                    
                </Card> 
                <div className='flex flex-col gap-y-1'>
                {isDetail ? (<>
                    {editButton}
                    {moreMenu}
                    </>) :( <>
                {detailButton}
                {editButton}
                </>)}          
                </div>
        </div>
       {/* {isDetail ?
          <Comments ticketId={ticket.id} comments={comments}/>
         : null
        } */}
        {comments}
    </div>
             )
}

export default TicketItem