"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { ClerkLoaded } from "@clerk/nextjs";
import Container from "@/components/shop/Container";
import { Logo } from "@/components/shop/logo";
import NavbarMenu from "./navbarMenu";
import ShoppingKart from "./ShoppingCart";
import { Moon, Sun } from "lucide-react";
import MoblieMenu from "../(sidebar)/MobileMenu";

interface NavbarContentProps {
    userExists: boolean;
}

function NavbarContent({ userExists }: NavbarContentProps) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check if user has a saved preference
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        // Set initial dark mode based on saved preference or system preference
        const initialDarkMode = savedTheme ? savedTheme === "dark" : prefersDark;

        setDarkMode(initialDarkMode);

        // Apply the initial theme
        document.documentElement.classList.toggle("dark", initialDarkMode);
    }, []);

    // Toggle dark mode
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.documentElement.classList.toggle("dark");
        // Save preference to localStorage
        localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    };

    return (
        <header
            className="py-2 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 fixed top-0 left-0 right-0 z-50 transition-colors duration-300 shadow-md"
        >
            <Container className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <MoblieMenu />
                    <Logo />
                </div>
                <NavbarMenu />
                <div className="flex items-center gap-5 w-auto justify-end">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                    >
                        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                    {/* Shopping Cart Component */}
                    <ShoppingKart />
                    {/* User Authentication */}
                    <ClerkLoaded>
                        {!userExists ? (
                            <Button asChild size="navbar" variant="link" className="text-black dark:text-white">
                                <SignInButton mode="modal">Login</SignInButton>
                            </Button>
                        ) : (
                            <UserButton />
                        )}
                    </ClerkLoaded>
                </div>
            </Container>
        </header>
    );
}

export default NavbarContent;
