"use client"
// import { useState } from "react"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import {useInView} from "react-intersection-observer"
import CardCompact from "@/components/card-compact"
// import { Button } from "@/components/ui/button"
import { CommentWithMetadata } from '@/features/comment/types'
import { PaginatedData } from "@/types/pagination"
import { getComments } from "../queries/get-comments"
import CommentCreateForm from "./comment-create-form"
import CommentDeleteButton from "./comment-delete-button"
import CommentItem from "./comment-item"
// import { metadata } from "@/app/layout"


type CommentsProps = {
    ticketId: string, 
    paginatedComments: PaginatedData<CommentWithMetadata>
}

 function Comments({ticketId, paginatedComments}: CommentsProps) {
    // const [comments, setComments] = useState(paginatedComments.list)
    // const [metadata, setMetadata] = useState(paginatedComments.metadata)
    const queryKey = ["comments", ticketId]
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey,
        queryFn: ({pageParam}) => getComments(ticketId, pageParam),
        initialPageParam: undefined as (string | undefined),
        getNextPageParam: (lastPage) => lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
        initialData: {
            pages: [
                {
                    list: paginatedComments.list,
                    metadata: paginatedComments.metadata
                }
            ],
            pageParams: [undefined]
        }

    })
    const comments = data.pages.map(page => page.list).flat() 
    const queryClient = useQueryClient()

    // const handleMore = () => {

    // //  const morePaginatedComments = await getComments(ticketId, metadata.cursor )
    // //  const moreComments = morePaginatedComments.list
    // //  setComments([...comments, ...moreComments])
    // //  setMetadata(morePaginatedComments.metadata)
    // fetchNextPage()

    // }
    //  const handleDelteComment = (_id: string) => {
    //     // console.log("deleted")
    //     // setComments((prevComments) => prevComments.filter((comment) => comment.id !== id))
    //     // refetch()
    //  }

    const handleDelteComment = () => {
        // console.log("deleted")
        // setComments((prevComments) => prevComments.filter((comment) => comment.id !== id))
        // refetch()
        queryClient.invalidateQueries({queryKey})
    }
    

    //  const handleCreateComment = (comment: CommentWithMetadata | undefined)=> {
    //     // if(!comment) return
    //     // setComments((prevComments) => [comment, ...prevComments])
    //     // refetch()
    // }
    const handleCreateComment = ()=> {
        // if(!comment) return
        // setComments((prevComments) => [comment, ...prevComments])
        // refetch()
        queryClient.invalidateQueries({queryKey})

    }

    const {ref, inView} = useInView()
    useEffect(()=> {
        if(inView && hasNextPage && !isFetchingNextPage){
            fetchNextPage()
        }
    }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])
  return (
    <>
        <CardCompact 
        title="Create Comment" 
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} onCreateComment={handleCreateComment}/>}
        />
            <div className="flex flex-col gap-y-2 ml-8">
                {comments.map((comment)=> (
                    <CommentItem 
                    key={comment.id}
                    comment={comment}
                    buttons={[
                        ...(comment.isOwner ? [<CommentDeleteButton key="0" id={comment.id} onDeleteComment={handleDelteComment}/>]:[])
                    ]}            
                    />
                ))}
            </div>
            {/* 
            <div className="flex flex-col justify-center ml-8">
                {hasNextPage && (
                    <Button variant="ghost" onClick={handleMore} disabled={isFetchingNextPage}>
                        More
                    </Button>
                )}
            </div> 
            */}
            <div ref={ref}>
                {
                    !hasNextPage && (
                        <p className="text-right text-xs italic">No more comments</p>
                    )
                }
            </div>
    </>
  )
}

export default Comments