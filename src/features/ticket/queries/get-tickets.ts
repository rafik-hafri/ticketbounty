import prisma from "@/lib/prisma"

export const getTickets = async () => {
   const tickets = await prisma.ticket.findMany({
    orderBy: {
        createdAt: "desc"
    }
   })
   return tickets || null
}