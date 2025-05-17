import { prisma } from "@/lib/prisma"
import { ParsedSearchParams } from "../types"

export const getTickets = async (userId: string | undefined, searchParams: ParsedSearchParams) => {
    const skip = searchParams.page * searchParams.size
    const take = searchParams.size

    const where = {
    userId,
     title: {
    contains: searchParams.search,
    mode:"insensitive" as const,
   }
    }
   const tickets = await prisma.ticket.findMany({
   where,
    skip,
    take,
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
   const count = await prisma.ticket.count({
    where,
   })
   return {
    list: tickets,
    metadata: {
        count,
        hasNextPage: count > skip + take
    }
    
    } 
}