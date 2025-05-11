"use client"
import { LucideLoaderCircle } from "lucide-react"
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import { cloneElement, SVGProps } from "react"
import clsx from "clsx"

type SubmitButtonProps = {
    label? : string,
    icon: React.ReactElement<SVGProps<SVGSVGElement>>,
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link",
    size?: "default" | "sm" | "lg" | "icon"

}
export const SubmitButton = ({label, icon, variant, size}:SubmitButtonProps) => {
    const {pending} = useFormStatus()
    return (
        <Button disabled={pending} type='submit' variant={variant} size={size}>
            {pending && (<LucideLoaderCircle className={clsx('mr-2 h-4 w-4 animate-spin',{
                "mr-2" : !!label
            })}
            />)}
            {label}
            {pending ? null : (
                <span>
                {icon ? (
                    <span className={clsx({
                        "ml-2": !!label
                    })}>
                        {cloneElement(icon, {
                            className: "h-4 w-4"
                        })}
                    </span>
                ): null}
            </span>

            )}
            
            
        </Button>
    )
}