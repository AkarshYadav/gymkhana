import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/app/(Home)/_components/(header)/Navbar"
import Footer from "@/app/(Home)/_components/(footer)/Footer"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Committee Portal",
    description: "Explore our committees and clubs",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Navbar />
                <main>
               
                    {children}
              
                </main>
                <Footer></Footer>
            </body>
        </html>
    )
}

