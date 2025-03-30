"use client"
import React from 'react'
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"
import { ComponentProps } from "react"
import { Home, ShirtIcon, UserIcon, StarIcon, WatchIcon } from 'lucide-react';
import { Poppins } from "next/font/google"

const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

const SiderMenu = () => {
    return (
        <nav className={cn("w-full", font.className)}>
            <div className="flex flex-col space-y-2">
                <SiderLink href="/shop" icon={Home}>Home</SiderLink>
                <SiderLink href="/shop/men" icon={ShirtIcon}>Men</SiderLink>
                <SiderLink href="/shop/women" icon={UserIcon}>Women</SiderLink>
                <SiderLink href="/shop/featured" icon={StarIcon}>Featured</SiderLink>
                <SiderLink href="/shop/accessories" icon={WatchIcon}>Accessories</SiderLink>
            </div>
        </nav>
    )
}

function SiderLink({
    children,
    href,
    icon: Icon
}: Omit<ComponentProps<typeof Link>, "className"> & { icon: React.ComponentType<{ size?: number }> }) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={cn(
                "group flex items-center px-4 py-3 rounded-lg transition-all duration-300 ease-in-out",
                "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                "hover:text-black dark:hover:text-white",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                isActive && "bg-blue-50 rounded-xl dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold",
                "relative overflow-hidden"
            )}
        >
            {/* Icon */}
            <div className={cn(
                "mr-4 transition-transform duration-300 group-hover:scale-110",
                isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
            )}>
                <Icon size={20} />
            </div>

            {/* Text */}
            <span className="flex-grow text-sm tracking-wide">
                {children}
            </span>

            {/* Active indicator */}
            {isActive && (
                <span className="absolute right-2 h-1.5 w-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
            )}
        </Link>
    )
}

export default SiderMenu