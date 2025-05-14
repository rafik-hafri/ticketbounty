"use client"
import { Ticket } from '@prisma/client'
import { useActionState, useRef } from 'react'
import { DatePicker, ImperativeHandleFromDatePicker } from '@/components/date-picker'
import FieldError from '@/components/form/field-error'
import Form from '@/components/form/form'
// import { useTransition } from 'react'
import { SubmitButton } from '@/components/form/submit-button'
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { fromCent } from '@/utils/currency'
import { upsertTicket } from '../actions/upsert-ticket'

type TicketUpdateFormProps = {
    ticket?:Ticket
}

function TicketUpsertForm({ticket}: TicketUpdateFormProps) {
    // const [isPending, startTransition] = useTransition()
    // const upsertTicketAction = (formData: FormData) => {
    //     startTransition(()=>{
    //         upsertTicket.bind(null, ticket?.id)(formData)

    //     })
    // }
const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id), EMPTY_ACTION_STATE
)
const datePickerImperativeHandleRef =
    useRef<ImperativeHandleFromDatePicker>(null);
const handleSuccess = () => {

datePickerImperativeHandleRef.current?.reset()
}




  
  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" type='text' defaultValue={(actionState.payload?.get("title") as string) ?? ticket?.title}/>
        <FieldError actionState={actionState} name="title"/>
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" name="content" defaultValue={(actionState.payload?.get("content") as string) ?? ticket?.content} />
        <FieldError actionState={actionState} name="content"/>
        <div className='flex flex-col sm:flex-row gap-y-2 gap-x-2 mb-1'>
            <div className='w-full sm:w-1/2'>
                <Label htmlFor='deadline' className='pb-1'>Deadline</Label>
                <DatePicker
                id="deadline"
                name="deadline"
                defaultValue={
                    (actionState.payload?.get("deadline") as string) ??
                    ticket?.deadline
                  }
                imperativeHandleRef={datePickerImperativeHandleRef as React.RefObject<ImperativeHandleFromDatePicker>} 
                 />
                 <FieldError actionState={actionState} name="deadline" />

            </div>
            <div className="w-full sm:w-1/2">
            <Label htmlFor="bounty" className='pb-1'>Bounty ($)</Label>
            <Input
                id="bounty"
                name="bounty"
                type="number"
                step=".01"
                defaultValue={
                (actionState.payload?.get("bounty") as string) ??
                (ticket?.bounty ? fromCent(ticket?.bounty) : "")
                }
            />
            <FieldError actionState={actionState} name="bounty" />
            
            </div>
        </div>
        <SubmitButton label={ticket ? "Edit" : "Create"}/>

    </Form>

)
}

export default TicketUpsertForm