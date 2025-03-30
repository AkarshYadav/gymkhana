"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import { Poppins } from "next/font/google";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

const queryUrl = "https://aiqtrfyk.api.sanity.io/v2025-01-26/data/query/production?query=*%5B_type+%3D%3D+%27committee%27%5D+%7C+order%28_createdAt+asc%29+%7B+_id%2C+name+%7D";

const SiderMenu = () => {
    const [committees, setCommittees] = useState([]);

    useEffect(() => {
        const fetchCommittees = async () => {
            try {
                const response = await fetch(queryUrl);
                const result = await response.json();
                setCommittees(result.result || []);
            } catch (err) {
                console.error("Failed to load committees for sidebar", err);
            }
        };
        fetchCommittees();
    }, []);

    return (
        <nav className={cn("w-full", font.className)}>
            <div className="flex flex-col space-y-2">
                <SiderLink href="/">Home</SiderLink>
                <SiderLink href="/aboutus">AboutUs</SiderLink>
                <SiderLink href="/events">Events</SiderLink>

                {/* Dropdown for Committees */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white">
                        Committees <ChevronDown size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="bg-white dark:bg-gray-800 shadow-lg text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md p-1">
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col space-y-1"
                        >
                            {committees.map(committee => (
                                <DropdownMenuItem key={committee._id} asChild>
                                    <Link
                                        href={`/committees/${committee._id}`}
                                        className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 hover:cursor-pointer"
                                    >
                                        {committee.name}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </motion.div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};

function SiderLink({ children, href }: Omit<ComponentProps<typeof Link>, "className">) {
    const pathname = usePathname();
    const isActive = pathname === href;

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
            <span className="flex-grow text-sm tracking-wide">
                {children}
            </span>
            {isActive && (
                <span className="absolute right-2 h-1.5 w-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
            )}
        </Link>
    );
}

export default SiderMenu;
