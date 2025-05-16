import { Separator } from "@radix-ui/react-separator"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { closedClasName } from "../constants"
import { NavItem } from "../types"


 type SidebarItemProps = {
        isOpen: boolean
        navItem: NavItem
        isActive:boolean
    }

function SidebarItem({isOpen, navItem, isActive}: SidebarItemProps) {
 
   const Icon = navItem.icon
  return (
    <>
    {navItem.separator && <Separator/>}
    <Link
    href={navItem.href}
    className={cn(
        buttonVariants({variant: "ghost"}),
        "group relative flex h-12 justify-start",
        isActive && "bg-muted font-bold hover:bg-muted"
    )}
    >
       <Icon className="h-5 w-5" />
        <span 
        className={cn(
            "absolute left-12 text-base duration-200",
            isOpen ? "md:block hidden" : "w-[78px]",
            !isOpen && closedClasName  
        )}
        >
            {navItem.title}
        </span>
    </Link>
    </>
  )
}

export default SidebarItem