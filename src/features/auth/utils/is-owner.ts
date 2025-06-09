import { User } from '@prisma/client'

type Entity = {
    userId: string | null
}

export const isOwner = (authUser:User | undefined | null, entity:Entity | undefined | null) =>{
    if(!authUser || !entity ) {
        return false
    }
    if(!entity.userId){
        return false
    }
    if(entity.userId !== authUser.id) {
        return false
    }
    return true
}