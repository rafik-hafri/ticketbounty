
import { User } from "@prisma/client"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { getAuth } from "../queries/get-auth"


export const useAuth = () => {
     const [user, setUser] = useState<User | null>(null)
      const [isFetched, setFetched] = useState(false)
        // We use `usePathname()` here to force a re-render when the route changes.
        // This component is used inside a layout, which is persistent and doesn't re-render on navigation.
        // `usePathname()` triggers a re-render on client-side route changes, allowing dynamic updates.
      const pathname = usePathname()
      useEffect(()=>{
        const fetchUser = async () => {
          const {user} = await getAuth()
          setUser(user)
          setFetched(true)
    
        }
        fetchUser()
      },[pathname])
      return {user, isFetched}

}