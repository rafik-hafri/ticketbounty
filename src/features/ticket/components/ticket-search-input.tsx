"use client"
import { useQueryState } from "nuqs"
import SearchInput from "@/components/search-input"
import { searchParser } from "../types"

type TicketSearchInputProps = {
    placeholder: string
}
function TicketSearchInput({placeholder}:TicketSearchInputProps) {
    const [search, setSearch] = useQueryState("search", searchParser)

  return (
    <SearchInput 
    value={search}
    onChange={setSearch}
    placeholder={placeholder}
    />
)
}

export default TicketSearchInput