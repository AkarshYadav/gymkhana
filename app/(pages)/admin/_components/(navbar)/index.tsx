"use client";

import Actions from "./actions";
import { Logo } from "../logo";

export const Navbar = () => {
  return (
    <nav
      className="fixed top-0 h-20 z-[49] w-full flex items-center justify-between px-2 lg:px-4 bg-blue-900 text-white shadow-sm  transition-all duration-300"
    >
      <Logo />
      <Actions />
    </nav>
  );
};
