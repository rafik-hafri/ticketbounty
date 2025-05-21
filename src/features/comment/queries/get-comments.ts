"use server"
import { getAuth } from "@/features/auth/actions/get-auth"
import { isOwner } from "@/features/auth/utils/is-owner"
import { prisma } from "@/lib/prisma"


export const getComments = async(ticketId: string, cursor?:string) => {
    const where = { 
        ticketId,
        id: {
            lt: cursor
        }
    }
    // const skip = offset ?? 0
    const {user} = await getAuth()
    const take=2
    
    
    
    const [fetchedComments, count] = await prisma.$transaction([
        prisma.comment.findMany({
       where, 
        take:take + 1,
        include: {
            user: {
                select: {
                    username:true
                }
            }
        }, 
        orderBy:[ {
            createdAt: "desc"
        }, 
    {
        id:"desc"
    }]
    }),
        prisma.comment.count({
        where
    })

    ])
    const hasNextPage = fetchedComments.length > take
    const comments = hasNextPage ? fetchedComments.slice(0, -1) : fetchedComments
    return {
        list: comments.map((comment) => ({
        ...comment,
        isOwner: isOwner(user, comment),
    })),
        metadata: {
            count, 
            hasNextPage: true,
            cursor: comments.at(-1)?.id
        }
    }
}