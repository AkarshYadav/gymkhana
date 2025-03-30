"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { ClerkLoaded, SignedIn } from "@clerk/nextjs";
import HeaderMenu from './headerMenu'
import { Logo } from '../logo'
import Container from '../Container'
import MoblieMenu from './moblieMenu'
import Searchbar from './Searchbar'
import ShoppingCart from './ShoppingBag'
import { ListOrdered, Moon, Sun } from "lucide-react";
import Link from "next/link";

interface HeaderContentProps {
    userExists: boolean;
}

function HeaderContent({ userExists }: HeaderContentProps) {
    const [darkMode, setDarkMode] = useState(false);

    // Initialize dark mode state from system preference
    useEffect(() => {
        // Check if user has a saved preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial dark mode based on saved preference or system preference
        const initialDarkMode = savedTheme 
            ? savedTheme === 'dark'
            : prefersDark;
        
        setDarkMode(initialDarkMode);
        
        // Apply the initial theme
        document.documentElement.classList.toggle('dark', initialDarkMode);
    }, []);

    // Toggle dark mode
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.documentElement.classList.toggle('dark');
        // Save preference to localStorage
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    };

    return (
        <header className="py-2 border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-600">
            <Container className="flex justify-between items-center">
                <div className='flex items-center gap-2'>
                    <MoblieMenu />
                    <Logo />
                </div>
                <HeaderMenu />
                <div className="flex items-center gap-5 w-auto justify-end">
                    
                    <Searchbar />
                    <ShoppingCart />
                    <ClerkLoaded>
                        <SignedIn>
                            <Link href="/shop/orders" className='group relative'>
                                <ListOrdered size={24} className="text-gray-600 dark:text-gray-300" />
                                <span className='absolute -top-1 -right-1 bg-black text-white h-3.5 w-3.5 rounded-full text-xs flex items-center justify-center font-semibold'>0</span>
                            </Link>
                        </SignedIn>
                        {!userExists ? (
                            <Button asChild size="navbar" variant="link" className="text-black dark:text-white">
                                <SignInButton mode="modal">Login</SignInButton>
                            </Button>
                        ) : (
                            <UserButton />
                        )}
                    </ClerkLoaded>
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                </div>
            </Container>
        </header>
    );
}

export default HeaderContent;