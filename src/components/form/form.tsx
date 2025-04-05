import { toast } from "sonner"
import useActionFeedback from "./hooks/use-action-feedback"
import { ActionState } from "./utils/to-action-state"


type FormProps = {
  action: (payload: FormData) => void,
  children: React.ReactNode,
  actionState: ActionState,
  onSuccess?:() => void,
  onError?:() => void,


}
function Form({action, children, actionState, onSuccess, onError}:FormProps ) {
  useActionFeedback(actionState, {
    onSuccess: ({actionState})=>{
        if(actionState.message){
            toast.success(actionState.message)
        }
        if(onSuccess) {
          onSuccess()
        }
    },
    onError: ({actionState})=>{
        if(actionState.message){
            toast.error(actionState.message)

        }
        if(onError) {
          onError()
        }
    }
})
  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  )
}

export default Form