import { prisma } from "@/lib/prisma"
import { ParsedSearchParams } from "../types"

export const getTickets = async (userId: string | undefined, searchParams: ParsedSearchParams) => {
   const tickets = await prisma.ticket.findMany({
   where: {
    userId,
         title: {
        contains: searchParams.search,
        mode:"insensitive"
    }
   },
    orderBy: {
        // createdAt: "desc"
        // ...(searchParams.sort === "newest" && {createdAt:"desc"}),
        // ...(searchParams.sort === "bounty" && {bounty: "desc"})
        [searchParams.sortKey]: searchParams.sortValue
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