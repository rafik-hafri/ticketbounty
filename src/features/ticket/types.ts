
import {createSearchParamsCache, parseAsString} from "nuqs/server"

export type TicketStatus = "OPEN" | "DONE"| "IN_PROGRESS"
export type Ticket = {
    id: string,
    title: string,
    content: string,
    status: TicketStatus

}

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

export const searchParamsCache = createSearchParamsCache({
    search: searchParser,
    ...sortParser
})

export type ParsedSearchParams = Awaited<ReturnType<typeof searchParamsCache.all>>