"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'


export type SortSelectOption = {
        label: string,
        sortValue:string,
        sortKey:string
}
type SortObject = {
    sortKey: string
    sortValue: string
}
type SortSelectProps = {
    options:SortSelectOption []
    value:SortObject
    onChange: (sort:SortObject) => void
}
function SortSelect({ options, value, onChange}:SortSelectProps) {
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
        
        onChange({
            sortKey,
            sortValue
        })
    }
  return (
    <Select defaultValue={value.sortKey + "_" + value.sortValue} onValueChange={handleSort} >
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