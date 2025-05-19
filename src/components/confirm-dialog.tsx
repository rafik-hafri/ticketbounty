
"use client"
import React, { cloneElement, useActionState, useState } from 'react'
import Form from './form/form'
import { SubmitButton } from './form/submit-button'
import { ActionState, EMPTY_ACTION_STATE } from './form/utils/to-action-state'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog'


type useConfirmDialogProps = {
    action: ()=> Promise<ActionState> 
    trigger: React.ReactElement<{ onClick?: () => void }>
    title?:string
    description?:string
    onSuccess?:(actionState:ActionState) => void
}
export function useConfirmDialog({action, trigger, title= "Are you absolutely sure?", description= "This action cannot be undone. Make sure you inderstand the consequences.",onSuccess}: useConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dialogTrigger = cloneElement(trigger, {
    onClick:() => setIsOpen(state => !state)
  })

  const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE)
  const handleClosingDialog = () => {
    setIsOpen(false)
    onSuccess?.(actionState)
  }
  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen} >
    
    <AlertDialogContent >
        <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>
           {description}
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction asChild>
            <Form action={formAction} actionState={actionState} onSuccess={handleClosingDialog} onError={handleClosingDialog}>
                <SubmitButton label='confirm'/>
            </Form>
        </AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    
    
   
    </AlertDialog>
  )
  return [dialogTrigger, dialog]
}