"use client"
import { Ticket, TicketStatus } from "@prisma/client"
import {  LucideTrash } from "lucide-react"
import { toast } from "sonner"
import { useConfirmDialog } from "@/components/confirm-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deleteTicket } from "../actions/delete-ticket"
import { updateTicketStatus } from "../actions/update-ticket-status"
import { TICKET_STATUS_LABELS } from "../constants"

type TicketMoreMenuProps = {
    ticket:Ticket
    trigger:React.ReactNode
}
function TicketMoreMenu({ticket, trigger}:TicketMoreMenuProps) {
    // const deleteButton = (<DropdownMenuItem className="flex  items-center">
    //     <LucideTrash className="mr-2 h-4 w-4"/>
    //     <span>Delete</span>
    //     </DropdownMenuItem>)
    // const deleteButton = ( 
    //     <ConfirmDialog action={deleteTicket.bind(null, ticket.id)} trigger= {            
    //         <DropdownMenuItem className="flex  items-center">
    //          <LucideTrash className="mr-2 h-4 w-4"/>
    //           <span>Delete</span>
    //        </DropdownMenuItem>
    //     }
    //         />
    // )
    const [deleteButton, deleteDialog] = useConfirmDialog({
        action: deleteTicket.bind(null, ticket.id),
        trigger: (
            <DropdownMenuItem className="cursor-pointer">
                <LucideTrash className="mr-2 h-4 w-4"/>
                <span>Delete</span>
            </DropdownMenuItem>
        )

        
    })
 

        const handleUpdateTicketStatus = async(value: string) => {

           const promise =   updateTicketStatus(ticket.id, value as TicketStatus)
           toast.promise(promise, {
            loading: "Updating status..."
           })
           const result = await promise

           if (result.status === "ERROR"){
            toast.error(result.message)

           }else {
            toast.success(result.message)


           }

        }
    const ticketStatusRadioGroup= (
            <DropdownMenuRadioGroup value={ticket.status} onValueChange = {handleUpdateTicketStatus} >
            {(Object.keys(TICKET_STATUS_LABELS) as (keyof typeof TICKET_STATUS_LABELS)[]).map((key)=>(
                          <DropdownMenuRadioItem className="cursor-pointer" key={key} value={key}>{TICKET_STATUS_LABELS[key]}</DropdownMenuRadioItem>
    
            ))}
             
            </DropdownMenuRadioGroup>
        )
        
return (
    <>
    {deleteDialog}
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    {trigger}
    </DropdownMenuTrigger>
    <DropdownMenuContent  className="w-56" side="left" >
      {ticketStatusRadioGroup}
        <DropdownMenuSeparator />

        {deleteButton}
       
    </DropdownMenuContent>
    </DropdownMenu>
    </>
)
}

export default TicketMoreMenu

