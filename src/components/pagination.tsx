import { Button } from "./ui/button"

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
  return (
    <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
            {label}
            <div className="flex gap-x-2">
                {previousButton}
                {nextButton}
            </div>
        </p>
    </div>
  )
}

export default Pagination