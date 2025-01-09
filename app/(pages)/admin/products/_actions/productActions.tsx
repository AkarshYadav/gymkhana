"use client"

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { deleteProduct, toggleProductAvaliablity } from "@/actions/admin_actions/products"


export function ActiveToggleDropdownItem({
    id,
    isAvailableForPurchase,
  }: {
    id: string
    isAvailableForPurchase: boolean
  }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
      <DropdownMenuItem
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            await  toggleProductAvaliablity(id, !isAvailableForPurchase)
            router.refresh()
          })
        }}
      >
        <span className="hover:border-none  hover:cursor-pointer rounded-lg p-2 font-normal">
        {isAvailableForPurchase ? "Deactivate" : "Activate"}
        </span>
      </DropdownMenuItem>
    )
  }
  
  export function DeleteDropdownItem({
    id,
    disabled,
  }: {
    id: string
    disabled: boolean
  }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
      <DropdownMenuItem
      
        disabled={disabled || isPending}
        onClick={() => {
          startTransition(async () => {
            await deleteProduct(id)
            router.refresh()
          })
        }}
      >
          <span className="hover:border-none hover:cursor-pointer rounded-lg p-2 font-normal hover:text-destructive">
        Delete
          </span>
      </DropdownMenuItem>
    )
  }