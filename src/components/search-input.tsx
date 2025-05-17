"use client"
import {useDebouncedCallback} from "use-debounce"
import { Input } from './ui/input'

type SearchInoutProps = {
    placeholder: string,
    value:string,
    onChange:(value: string) => void
}
function SearchInput({placeholder, value, onChange}:SearchInoutProps) {
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
        onChange(event.target.value)
    }, 300)
  return (
    <Input  defaultValue={value} placeholder= {placeholder} onChange={handleSearch}/>

  )
}

export default SearchInput