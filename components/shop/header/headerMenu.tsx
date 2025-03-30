"use client"

import React from 'react'
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"
import { ComponentProps } from "react"
import { Poppins } from "next/font/google"

const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});
const HeaderMenu = () => {
    return (
        <>

            <div className={cn("hidden md:flex items-center space-x-4 text-gray-600 dark:text-gray-300", font.className)}>
                <NavLink href="/shop" >Home</NavLink>
                <NavLink href="/shop/men" >Men</NavLink>
                <NavLink href="/shop/women" >Women</NavLink>
                <NavLink href="/shop/featured" >Featured</NavLink>
                <NavLink href="/shop/accessories" >Accessories</NavLink>
            </div>

        </>
    )
}

export default HeaderMenu


function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathname = usePathname()
    return (
        <Link
            {...props}
            className={cn(
                "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary text-muted-foreground relative font-medium ",
                pathname === props.href && "bg-secondary text-primary"
            )}
        />
    )
}