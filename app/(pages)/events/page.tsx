"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import EventCard from "./_components/enhanced-event-card"
import { format, parseISO } from "date-fns"

// Define the Event type
type Event = {
  _id: string
  name: string
  description: string
  images: { url: string }[]
  eventDate: string
  eventTime: string
  location: string
  organizer: string
  registrationLink: string
  formattedDate?: string
}

// Function to fetch all events directly from Sanity
async function getAllEvents(): Promise<Event[]> {
  const EVENTS_QUERY_URL =
    "https://aiqtrfyk.api.sanity.io/v2025-01-26/data/query/production?query=*%5B_type+%3D%3D+%22event%22%5D+%7C+order%28eventDate+desc%29+%7B%0A++_id%2C%0A++name%2C%0A++description%2C%0A++images%5B%5D+%7B+%22url%22%3A+asset-%3Eurl+%7D%2C%0A++eventDate%2C%0A++eventTime%2C%0A++location%2C%0A++organizer%2C%0A++registrationLink%0A%7D%0A%0A"

  try {
    const response = await fetch(EVENTS_QUERY_URL)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`)
    }
    
    const data = await response.json()
    return data.result || []
  } catch (error) {
    console.error("Error fetching events:", error)
    return []
  }
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null)

    useEffect(() => {
        async function fetchEvents() {
            setLoading(true)
            try {
                const allEvents = await getAllEvents()

                // Set the first event as featured if events exist
                if (allEvents.length > 0) {
                    setFeaturedEvent(allEvents[0])
                }

                setEvents(allEvents)
            } catch (err) {
                setError("Failed to load events")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchEvents()
    }, [])

    const formatDate = (dateString?: string) => {
        try {
            if (!dateString) return "TBA"
            return format(parseISO(dateString), "MMMM d, yyyy")
        } catch (error) {
            console.error("Date formatting error:", error)
            return dateString
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    }

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
            {/* Hero Banner Section */}
            <section className="relative w-full h-[80vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-violet-800/80 to-indigo-900/80 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/events.jpg')",
                        filter: "brightness(0.6)"
                    }}
                />

                {/* Animated Geometric Shapes */}
                <div className="absolute top-16 left-16 w-24 h-24 rounded-full bg-orange-500/30 z-10 animate-bounce" />
                <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-lg bg-yellow-500/30 z-10 animate-pulse" />
                <div className="absolute  bottom-1/4 left-1/3 w-36 h-36 rotate-45 bg-pink-500/30 z-10 animate-spin-slow" />
                <div className="absolute bottom-16 right-16 w-28 h-28 rounded-full bg-blue-500/30 z-10 animate-bounce" />

                <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center z-20">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight">
                            <span className="block text-orange-400 drop-shadow-lg">GYMKHANA</span>
                            <span className="block text-white">EVENTS & FESTIVALS</span>
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/80">
                            Experience the thrill of creativity, culture, and celebration at our vibrant Gymkhana events!
                        </p>
                    </motion.div>
                </div>
            </section>


            {/* Featured Event Section */}
            {featuredEvent && (
                <section className="py-16 container mx-auto px-4 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 flex flex-col ">
                                <div className="flex justify-center ">
                                    <Image
                                        src={featuredEvent.images?.[0]?.url || "/placeholder.svg"}
                                        alt={featuredEvent.name}
                                        width="400"
                                        height="400"
                                        className="object-cover transition-transform duration-300 hover:scale-105"
                                        priority
                                    />
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center text-gray-800 dark:text-white">
                                <Badge variant="outline" className="mb-4 px-3 py-1 w-fit border-orange-500 text-orange-500">
                                    Latest
                                </Badge>
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{featuredEvent.name}</h2>
                                <p className="text-muted-foreground text-lg mb-6">{featuredEvent.description}</p>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {[
                                        { icon: Calendar, text: formatDate(featuredEvent.eventDate) },
                                        { icon: Clock, text: featuredEvent.eventTime || "TBA" },
                                        { icon: MapPin, text: featuredEvent.location || "TBA" },
                                        { icon: Users, text: featuredEvent.organizer || "Gymkhana" }
                                    ].map(({ icon: Icon, text }, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <Icon className="h-5 w-5 text-orange-500" />
                                            <span className="text-sm text-gray-800 dark:text-white">{text}</span>
                                        </div>
                                    ))}
                                </div>

                                {featuredEvent.registrationLink ? (
                                    <Button
                                        asChild
                                        className="bg-orange-500 hover:bg-orange-600 text-white transform hover:scale-105 transition-transform"
                                    >
                                        <a href={featuredEvent.registrationLink} target="_blank" rel="noopener noreferrer">
                                            Register for Event
                                        </a>
                                    </Button>
                                ) : (
                                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                                        Register for Event
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </section>
            )}

            {/* All Events Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white"
                        >
                            Explore All Events
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "5rem" }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="h-1 bg-orange-500 mx-auto mt-4"
                        />
                    </div>

                    <Tabs defaultValue="all" className="w-full">
                        <TabsContent value="all">
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                                </div>
                            ) : error ? (
                                <div className="text-center text-red-500 p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">{error}</div>
                            ) : events.length === 0 ? (
                                <div className="text-center p-12">
                                    <h3 className="text-xl font-medium text-muted-foreground">No events available at the moment</h3>
                                </div>
                            ) : (
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {events.map((event) => (
                                        <motion.div key={event._id} variants={itemVariants}>
                                            <EventCard
                                                event={{
                                                    ...event,
                                                    formattedDate: formatDate(event.eventDate),
                                                }}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </div>
    )
}