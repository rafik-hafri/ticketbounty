"use client"
import {useQueryState} from "nuqs"
import {useDebouncedCallback} from "use-debounce"
import { searchParser } from "@/features/ticket/types"
import { Input } from './ui/input'

type SearchInoutProps = {
    placeholder: string
}
function SearchInput({placeholder}:SearchInoutProps) {
    const [search, setSearch] = useQueryState("search", searchParser)
    // const searchParams = useSearchParams()
    // const pathname = usePathname()
    // const {replace} = useRouter()

    const handleSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        // const value = event.target.value
        // const params = new URLSearchParams(searchParams)
        // if(value) {
        //     params.set("search", value)
        // }else {
        //     params.delete("search")
        // }
        // replace(`${pathname}?${params.toString()}`, {
        //     scroll:false
        // })
        setSearch(event.target.value)
    }, 300)
  return (
    <Input  defaultValue={search} placeholder= {placeholder} onChange={handleSearch}/>

  )
}

export default SearchInput