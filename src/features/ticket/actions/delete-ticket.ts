"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { setCookieByKey } from "@/actions/cookies"
import { fromErrorToActionState } from "@/components/form/utils/to-action-state"
import { ticketsPath } from "@/paths"
import { prisma } from "@/lib/prisma"

export const deleteTicket = async(id: string) => {
     new Promise((resolve)=> setTimeout(()=>resolve, 200))
    try {
        await prisma.ticket.delete({
            where: {
                id
            }
        })
        
    } catch (error) {
        return fromErrorToActionState(error)
        
    }
    
   
    await setCookieByKey("toast", "Ticket deleted")
    revalidatePath(ticketsPath())
    
    redirect(ticketsPath())
    

    

}