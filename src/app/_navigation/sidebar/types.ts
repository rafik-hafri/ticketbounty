import { LucideIcon } from "lucide-react"

export type NavItem = {
    separator?: boolean
    title: string,
    icon: LucideIcon,
    href: string
}