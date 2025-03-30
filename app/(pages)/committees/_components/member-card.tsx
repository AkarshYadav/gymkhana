"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface MemberCardProps {
    name: string
    email: string
    imageUrl: string
    role: string
    clubs: string[]
    index: number
}

export default function MemberCard({ name, email, imageUrl, role, clubs, index }: MemberCardProps) {
    const roleLabels = {
        general_sec: "General Secretary",
        club_sec: "Club Secretary",
        member: "Member",
    }

    // Determine badge color based on role
    const getBadgeVariant = () => {
        switch (role) {
            case "general_sec":
                return "default"
            case "club_sec":
                return "secondary"
            default:
                return "outline"
        }
    }

    // Role-based accent colors
    const getRoleAccentColor = () => {
        switch (role) {
            case "general_sec":
                return "bg-gradient-to-r from-amber-500 to-yellow-500"
            case "club_sec":
                return "bg-gradient-to-r from-blue-500 to-cyan-500"
            default:
                return "bg-gradient-to-r from-gray-500 to-slate-500"
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <Card className="overflow-hidden border  text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                    <div className="flex flex-col h-full">
                        {/* Top section with image */}
                        <div className="relative w-full h-48 overflow-hidden">
                            {/* Accent color strip based on role */}
                            <div className={`absolute top-0 left-0 right-0 h-1 ${getRoleAccentColor()}`}></div>
                            <div className="w-full h-48 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                                <Image
                                    src={imageUrl || "/placeholder.svg?height=480&width=480"}
                                    alt={name}
                                    width={480}
                                    height={480}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                            {/* Role badge - positioned at the top */}
                            {/* <div className="absolute top-3 right-3">
                                <Badge variant={getBadgeVariant() as any} className="px-3 py-1 text-sm font-bold text-orange-500  border-orange-500">
                                    {roleLabels[role as keyof typeof roleLabels] || role}
                                </Badge>
                            </div> */}
                        </div>

                        {/* Content section */}
                        <div className="p-5">
                            <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{name}</h3>

                            <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <Mail size={14} className="mr-1" />
                                <span>{email}</span>
                            </div>

                            {clubs && clubs.length > 0 && (
                                <div className="mt-3">
                                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                                        <Users size={14} className="mr-1" />
                                        <span>Affiliated with:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {clubs.map((club, i) => (
                                            <Badge key={i} variant="outline" className="text-xs">
                                                {club}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

