"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "next/link"

export default function EventCard({ event }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            whileHover={{
                y: -10,
                transition: { duration: 0.2 },
            }}
            className="h-full"
        >
            <Card
                className="overflow-hidden h-full border-2 transition-all duration-300 
        hover:border-orange-500/50 dark:hover:border-orange-400/50 
        hover:shadow-lg dark:bg-gray-800 bg-white"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <CardHeader className="p-0">
                    <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                            src={event.images?.[0]?.url || "/placeholder.svg"}
                            alt={event.name}
                            fill
                            className={`object-cover transition-transform duration-700 
                ${isHovered ? "scale-110" : "scale-100"}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <Badge className="bg-orange-500 text-white border-none">Event</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-800 dark:text-white">
                        {event.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                        {event.description}
                    </p>

                    <div className="space-y-3 text-sm">
                        {[
                            { icon: Calendar, text: event.formattedDate || event.eventDate },
                            { icon: Clock, text: event.eventTime || "TBA" },
                            { icon: MapPin, text: event.location || "TBA" }
                        ].map(({ icon: Icon, text }, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Icon className="h-4 w-4 text-orange-500" />
                                <span className="text-gray-600 dark:text-gray-300">{text}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">

                    <Button
                        asChild
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white 
              transform hover:scale-105 transition-transform"
                    >
                        <Link href={`/events/${event._id}`}>Learn More</Link>
                    </Button>

                </CardFooter>
            </Card>
        </motion.div>
    )
}