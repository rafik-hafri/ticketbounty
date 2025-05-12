import { prisma } from "@/lib/prisma"

export const getTickets = async (userId: string | undefined) => {
   const tickets = await prisma.ticket.findMany({
    where: {
        userId
    },
    orderBy: {
        createdAt: "desc"
    },
    include: {
        user: {
            select: {
                username:true
            }
        }
    }
   })
   return tickets || null
}