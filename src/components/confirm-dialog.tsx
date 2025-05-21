"use client"
import  { cloneElement, useActionState, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { toast } from 'sonner'
import useActionFeedback from './form/hooks/use-action-feedback'
import { ActionState, EMPTY_ACTION_STATE } from './form/utils/to-action-state'
import {  AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog'
import { Button } from './ui/button'


type useConfirmDialogProps = {
    action: ()=> Promise<ActionState> 
    trigger: React.ReactElement<{ onClick?: () => void }> | ((isPending: boolean) => React.ReactElement<{ onClick?: () => void }>)
    title?:string
    description?:string
    onSuccess?:(actionState:ActionState) => void
}
export function useConfirmDialog({action, trigger, title= "Are you absolutely sure?", description= "This action cannot be undone. Make sure you inderstand the consequences.",onSuccess}: useConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
 

  const [actionState, formAction, isPending] = useActionState(action, EMPTY_ACTION_STATE)
   const dialogTrigger = cloneElement(typeof trigger === "function" ? trigger(isPending) : trigger, {
    onClick:() => setIsOpen((state) => !state)
  })
  const toastRef = useRef< string | number | null>(null)
  useEffect(() => {
    if(isPending) {
      toastRef.current = toast.loading("Deleting...")
    } else if(toastRef.current){
      toast.dismiss(toastRef.current)
    }
    return () => {
      if(toastRef.current) {
        toast.dismiss(toastRef.current)
      }
    }
  }, [isPending])
   useActionFeedback(actionState, {
    onSuccess: ({actionState})=>{
        if(actionState.message){
            toast.success(actionState.message)
        }
        if(onSuccess) {
          onSuccess(actionState)
        }
    },
    onError: ({actionState})=>{
        if(actionState.message){
            toast.error(actionState.message)

        }
    }
})

  const dialog = (
    <>
    <AlertDialog open={isOpen} onOpenChange={setIsOpen} >
    <AlertDialogContent >
      <form action={()=> {
              flushSync(() => {
                setIsOpen(false);
              })
              formAction()
            }
            }>
        <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>
           {description}
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
            
           <Button type="submit">Confirm</Button>
          
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>            
    </AlertDialog>
    </>
  )
  return [dialogTrigger, dialog] as const
}