"use client"

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"
import { ComponentProps } from "react"
const Actions = () => {
    return (
        <>

            <div className="hidden md:flex items-center space-x-4">
                <NavLink href="/admin" >Dashboard</NavLink>
                <NavLink href="/admin/products" >Products</NavLink>
                <NavLink href="/admin/users" >Customers</NavLink>
                <NavLink href="/admin/orders" >Sales</NavLink>
            </div>
            <Link
                href="/shop">
                <div className="flex items-center hover:cursor-pointer ml-2">
                    <ShoppingCart />
                    <div className="hidden lg:flex items-center px-2 py-2 rounded-lg font-semibold">Shop</div>
                </div>
            </Link>
        </>
    )
}

export default Actions;


export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathname = usePathname()
    return (
        <Link
            {...props}
            className={cn(
                "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground font-semibold",
                pathname === props.href && "bg-white text-blue-900"
            )}
        />
    )
}