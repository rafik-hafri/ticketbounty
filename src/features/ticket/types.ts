
import { Prisma } from "@prisma/client"
import {createSearchParamsCache, parseAsInteger, parseAsString} from "nuqs/server"

export type TicketStatus = "OPEN" | "DONE"| "IN_PROGRESS"
export type Ticket = {
    id: string,
    title: string,
    content: string,
    status: TicketStatus

}

export type TicketWithMetadata =  Prisma.TicketGetPayload<{
    include: {user: {
        select:{
            username:true
        }
    }}
   }> & {isOwner: boolean}

export const searchParser = parseAsString.withDefault("").withOptions({
    shallow: false,
    clearOnDefault: true
})
export const sortParser = {
    sortKey: parseAsString.withDefault("createdAt"),
    sortValue: parseAsString.withDefault("desc"),
}
export const sortOptions = {
    shallow: false,
    clearOnDefault: true
}

export const paginationParser = {
    page: parseAsInteger.withDefault(0),
    size: parseAsInteger.withDefault(5),
}

export const paginationOptions = {
    shallow: false,
    clearOnDefault: true
}
export const searchParamsCache = createSearchParamsCache({
    search: searchParser,
    ...sortParser,
    ...paginationParser

})

export type ParsedSearchParams = Awaited<ReturnType<typeof searchParamsCache.all>>