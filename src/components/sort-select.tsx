"use client"
import { useQueryStates} from "nuqs"
import { sortOptions, sortParser } from '@/features/ticket/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'


type Option = {
        label: string,
        sortValue:string,
        sortKey:string
}
type SortSelectProps = {
    options:Option []
}
function SortSelect({ options}:SortSelectProps) {
    const [sort, setSort] = useQueryStates(sortParser, sortOptions)
    // const searchParams = useSearchParams()
    // const pathname = usePathname()
    // const {replace} = useRouter()
    const handleSort = (compositeKey: string) => {
        // const params = new URLSearchParams(searchParams)
        // if(value === defaultValue){
        //     params.delete("sort")
        // }
        // else if(value) {
        //     params.set("sort", value)
        // }else {
        //     params.delete("search")
        // }
        // replace(`${pathname}?${params.toString()}`, {
        //     scroll:false
        // })
        const [sortKey, sortValue] = compositeKey.split("_")
        console.log(sortKey)
        setSort({
            sortKey,
            sortValue
        })
    }
  return (
    <Select defaultValue={sort.sortKey + "_" + sort.sortValue} onValueChange={handleSort} >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
       {options.map((option)=> (
        <SelectItem key={option.sortKey + "_" + option.sortValue} value={option.sortKey + "_" + option.sortValue}>
            {option.label}
        </SelectItem>
       ))}
      </SelectContent>
    </Select>
  )
}

export default SortSelect