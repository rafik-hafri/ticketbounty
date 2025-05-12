import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";


//    This layout uses an async function, so it's treated as a Server Component with dynamic behavior
//    IMPORTANT: Because this layout is dynamic, **all its children also become dynamic**
//    This affects performance and disables static optimization for nested routes
export default async function AuthenticatedLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  //     Auth check to protect routes — redirects if not authenticated
  // ⚠️ This only protects server-side rendering at this level — individual actions/routes should also check
  // 🛡️  Security Warning: Malicious users can directly request a page **without triggering the layout**.
  // ✅ **The secure way** is to include this logic **on each page** or **in API routes**, so it cannot be bypassed.
  //     Layout-based security only prevents access to pages rendered within that layout but **not to direct API requests / server actions** or pages that bypass this layout.
    await getAuthOrRedirect()
  return <>{children}</>
}