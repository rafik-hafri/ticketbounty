import { SelectContent, SelectValue } from "@radix-ui/react-select"
import { Button } from "./ui/button"
import { Select, SelectItem, SelectTrigger } from "./ui/select"

type PageAndSize = {
    page: number
    size: number
}

type PaginationProps = {
    pagination: PageAndSize
    onPagination: (pagiantion: PageAndSize) => void
    paginatedMetadata: {
        count: number,
        hasNextPage: boolean
    }
}
function Pagination({pagination, onPagination, paginatedMetadata: {count, hasNextPage}}: PaginationProps) {
    const startOffset = pagination.page * pagination.size + 1
    const endOffset = startOffset - 1 + pagination.size
    const actualEndOffset = Math.min(endOffset, count)

    const label = `${startOffset} - ${actualEndOffset} of ${count}`
    const handleNextPage = () => {
        onPagination({...pagination, page: pagination.page + 1})

    }
    const handlePreviousPage =() => {
        onPagination({...pagination, page: pagination.page - 1})
    }
    const nextButton = (
        <Button
        variant="outline"
        size="sm"
        disabled={!hasNextPage}
        onClick={handleNextPage}
        >
            Next
        </Button>
    )
       const previousButton = (
        <Button
        variant="outline"
        size="sm"
        disabled={pagination.page < 1}
        onClick={handlePreviousPage}
        >
            Previous
        </Button>
    )
    const handleChangeSize = (size:string) => {
        onPagination({page: 0, size:parseInt(size)})
    }
    const sizeButton = (
        <Select onValueChange={handleChangeSize} defaultValue={pagination.size.toString()}>
            <SelectTrigger className="h-[36px]">
                <SelectValue/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="2">5</SelectItem>
                <SelectItem value="2">10</SelectItem>
                <SelectItem value="2">25</SelectItem>
                <SelectItem value="2">50</SelectItem>
                <SelectItem value="2">100</SelectItem>
            </SelectContent>
        </Select>
    )
  return (
    <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
            {label}
        </p>
        <div className="flex gap-x-2">
                {sizeButton}
                {previousButton}
                {nextButton}
        </div>
        
    </div>
  )
}

export default Pagination