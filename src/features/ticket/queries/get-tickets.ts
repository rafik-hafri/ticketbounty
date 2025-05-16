import { prisma } from "@/lib/prisma"
import { SearchParams } from "../types"

export const getTickets = async (userId: string | undefined, searchParams: SearchParams) => {
   const tickets = await prisma.ticket.findMany({
   where: {
    userId,
    title: {
        contains: searchParams.search,
        mode:"insensitive"
    }
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