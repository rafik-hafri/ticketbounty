"use server"
import { cookies } from "next/headers"
import { cache } from "react"
import { lucia } from "@/lib/lucia"

// `cache` memoizes this function to ensure it runs **once per server request**.
// This prevents redundant calls to `lucia.validateSession()` and repeated cookie access
// during React Server Component (RSC) rendering, improving performance and ensuring
// consistent session state throughout the request lifecycle.
export const getAuth = cache(async () => {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null
    if (!sessionId) {
        return {
            user:null,
            session:null
        }
    }
    const result = await lucia.validateSession(sessionId)
    // **This server action can be triggered in two contexts:**
    // 1. **During RSC rendering** (initial page load): Cookie mutations WILL FAIL because
    //    HTTP headers are already sent. The `try-catch` silently ignores these errors.
    // 2. **As a standalone server action** (client-triggered): Cookie mutations WILL WORK
    //    because this executes in a fresh request context before headers are sent.
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
        // **Silently ignore errors in RSC rendering context.**
        // Cookie mutations are only allowed in:
        // - Middleware (pre-render phase)
        // - Client-triggered server actions
        // - Route Handlers (API endpoints)
    }
    return result
})