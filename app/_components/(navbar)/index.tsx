"use client"

import { useState, useEffect } from "react";
import Actions from "./actions";
import { Logo } from "../logo";
import Container from "@/components/shop/Container";
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 h-20 z-[49] w-full flex items-center justify-between px-2 lg:px-4 transition-all duration-300 ${
        isScrolled ? "bg-black text-white shadow-md" : "bg-transparent text-black"
      }`}
    >
      
      <Logo />
      <Actions />
    </nav>
  );
};
