import  { useEffect, useRef } from 'react'
import { ActionState } from '../utils/to-action-state'

type OnArgs = {
    actionState: ActionState
}
type UseActionFeedbackOptions = {
    onSuccess?: (onArgs:OnArgs) => void,
    onError?: (onArgs:OnArgs) => void
}
function useActionFeedback(actionState: ActionState, options:UseActionFeedbackOptions) {
    const prevTimesTamp = useRef(actionState.timestamp)
    const isUpdate = prevTimesTamp.current !== actionState.timestamp
 useEffect(()=> {
    if(!isUpdate) return
 if(actionState.status === "SUCCESS"){
     
     options.onSuccess?.({actionState})
 
 }
 if(actionState.status === "ERROR"){
    options.onError?.({actionState})
 }
 prevTimesTamp.current = actionState.timestamp
 },[isUpdate,actionState, options])
}

export default useActionFeedback