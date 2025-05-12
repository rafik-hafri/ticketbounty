"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { setCookieByKey } from "@/actions/cookies"
import { fromErrorToActionState } from "@/components/form/utils/to-action-state"
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect"
import { isOwner } from "@/features/auth/utils/is-owner"
import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths"

export const deleteTicket = async(id: string) => {
     new Promise((resolve)=> setTimeout(()=>resolve, 200))
     const {user} = await getAuthOrRedirect()

    try {
        const ticket  =await prisma.ticket.findUnique({
            where: {
                id,
            }
        })
        if(!ticket || !isOwner(user, ticket))
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