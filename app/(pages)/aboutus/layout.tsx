import type React from "react"
import Navbar from "../../(Home)/_components/(header)/Navbar"
import Footer from "@/app/(Home)/_components/(footer)/Footer"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"

const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export default function AboutUsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={cn("min-h-screen bg-background", font.className)}>
            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
        </div>
    )
}

