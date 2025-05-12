"use server"
import { cookies } from "next/headers"
import { cache } from "react"
import { lucia } from "@/lib/lucia"

//  This function is wrapped in `react.cache` to memoize its result during a single request.
//  This avoids calling `lucia.validateSession()` and accessing cookies multiple times
//  in the same server request, improving performance and ensuring consistency.
export const getAuth = cache(async () => {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null
    if (!sessionId) {
        return {
            user:null,
            session:null
        }
    }
    const result = await lucia.validateSession(sessionId)
    // In React Server Components (RSC), attempting to mutate headers (e.g., setting cookies) 
    // is not guaranteed to work because streaming may have already started.
    // This `try-catch` ensures that if `cookies().set(...)` fails due to being in a streamed RSC context,
    // we silently ignore the error instead of crashing the whole render.
    // Cookie mutation is only safe in contexts like middleware, server actions, or route handlers.
    try {
        if(result.session && result.session.fresh){
            const sessionCookie = lucia.createSessionCookie(result.session.id)
            ;(await cookies()).set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            )
        }
        if(!result.session){
            const sessionCookie = lucia.createBlankSessionCookie()
            ;(await cookies()).set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            )
        }
    } catch {
        // do nothing if used in a RSC

    }
    return result
})