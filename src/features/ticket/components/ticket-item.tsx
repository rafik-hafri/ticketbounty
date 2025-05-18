import { Prisma} from '@prisma/client'
import clsx from "clsx"
import { LucideMoreVertical, LucidePencil, LucideSquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getAuth } from '@/features/auth/actions/get-auth'
import { isOwner } from '@/features/auth/utils/is-owner'
import Comments from '@/features/comment/components/comment'
import { CommentWithMetadata } from '@/features/comment/types'
import { ticketEditPath, ticketPath } from '@/paths'
import { toCurrencyFromCent } from '@/utils/currency'
import { TICKET_ICONS } from '../constants'
import TicketMoreMenu from './ticket-more-menu'


type TicketItemProps = {
   ticket: Prisma.TicketGetPayload<{
    include: {user: {
        select:{
            username:true
        }
    }}
   }>
   isDetail?: boolean,
   comments?: CommentWithMetadata[]
}
async function TicketItem({ticket, isDetail, comments}: TicketItemProps) {
    const {user} = await getAuth()
    const isTicketOwner = isOwner(user, ticket)
    const editButton = isTicketOwner ? (
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

    const moreMenu = isTicketOwner ? ( <TicketMoreMenu ticket={ticket} trigger={
            <Button variant="outline" size="icon">
            <LucideMoreVertical className="h-4 w-4"/>
            </Button>
    }/>) : null

  return (
    <div className={clsx("w-full  flex gap-y-4", {
            "max-w-[420px]": !isDetail,
            "max-w-[580px]": isDetail
        })}>
        <div className='flex gap-x-2'>
                <Card  className='w-full max-w-[480px]'> 
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
       {isDetail ?
          <Comments ticketId={ticket.id} comments={comments}/>
         : null
        }
    </div>
             )
}

export default TicketItem