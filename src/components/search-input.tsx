"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from './ui/input'
import {useDebouncedCallback} from "use-debounce"

type SearchInoutProps = {
    placeholder: string
}
function SearchInput({placeholder}:SearchInoutProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const handleSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const params = new URLSearchParams(searchParams)
        if(value) {
            params.set("search", value)
        }else {
            params.delete("search")
        }
        replace(`${pathname}?${params.toString()}`, {
            scroll:false
        })
    }, 300)
  return (
    <Input onChange={handleSearch}/>

  )
}

export default SearchInput