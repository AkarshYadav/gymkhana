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
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const queryUrl = "https://aiqtrfyk.api.sanity.io/v2025-01-26/data/query/production?query=*%5B_type+%3D%3D+%27committee%27%5D+%7C+order%28_createdAt+asc%29+%7B+_id%2C+name+%7D";

interface Committee {
  _id: string;
  name: string;
}

const NavbarMenu = () => {
  const [committees, setCommittees] = useState<Committee[]>([]);


  useEffect(() => {
    const fetchCommittees = async () => {
      try {
        const response = await fetch(queryUrl);
        const result = await response.json();
        setCommittees(result.result || []);
      } catch (err) {
        console.error("Failed to load committees for navbar", err);
      }
    };
    fetchCommittees();
  }, []);

  return (
    <div className={cn("hidden md:flex items-center space-x-4 text-gray-600 dark:text-gray-300", font.className)}>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/aboutus">AboutUs</NavLink>
      <NavLink href="/events">Events</NavLink>


      {/* Dropdown for Committees */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary text-muted-foreground font-medium">
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
  );
};

export default NavbarMenu;

// Reusable NavLink Component
function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary text-muted-foreground relative font-medium",
        pathname === props.href && "bg-secondary text-primary"
      )}
    />
  );
}