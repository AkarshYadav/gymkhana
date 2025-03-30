"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Users, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { format, parseISO } from "date-fns"

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchEventDetails() {
      try {
        const response = await fetch(`/api/events/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch event details")
        }
        const data = await response.json()
        setEvent(data)
      } catch (err) {
        setError("Failed to load event details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchEventDetails()
    }
  }, [id])

  const formatDate = (dateString) => {
    try {
      if (!dateString) return "TBA"
      return format(parseISO(dateString), "MMMM d, yyyy")
    } catch (error) {
      console.error("Date formatting error:", error)
      return dateString
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.name,
        text: `Check out this event: ${event.name}`,
        url: window.location.href
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert('Event link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center bg-gray-50 dark:bg-gray-900 min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Error Loading Event</h2>
        <p className="text-muted-foreground mb-8">{error || "Event not found"}</p>
        <Button 
          onClick={() => router.push("/events")} 
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Back to Events
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-violet-800/80 to-indigo-900/80 z-10" />
        <div className="absolute inset-0">
          <Image
            src={event.images?.[0]?.url || "/placeholder.svg"}
            alt={event.name}
            fill
            className="object-cover opacity-70 transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>

        <div className="absolute top-4 left-4 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/20 backdrop-blur-sm hover:bg-background/40 text-white"
            onClick={() => router.push("/events")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent z-20">
          <div className="container mx-auto">
            <Badge className="mb-4 bg-orange-500 text-white border-none">Event Details</Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{event.name}</h1>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">About This Event</h2>
              <p className="text-muted-foreground whitespace-pre-line">{event.description}</p>
            </motion.div>

            <Separator />

            {event.images && event.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Event Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.images.slice(1).map((image, index) => (
                    <div 
                      key={index} 
                      className="relative aspect-square rounded-lg overflow-hidden shadow-md"
                    >
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={`${event.name} - Image ${index + 2}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl border shadow-lg p-6"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Event Information</h3>

              <div className="space-y-4 mb-6">
                {[
                  { icon: Calendar, label: "Date", value: formatDate(event.eventDate) },
                  { icon: Clock, label: "Time", value: event.eventTime || "TBA" },
                  { icon: MapPin, label: "Location", value: event.location || "TBA" },
                  event.organizer ? { icon: Users, label: "Organizer", value: event.organizer } : null
                ].filter(Boolean).map(({ icon: Icon, label, value }, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">{label}</h4>
                      <p className="text-muted-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              {event.registrationLink ? (
                <Button 
                  asChild 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white mb-4 transform hover:scale-105 transition-transform"
                >
                  <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                    Register Now
                  </a>
                </Button>
              ) : (
                <Button className="w-full mb-4 bg-orange-500 hover:bg-orange-600 text-white">
                  Register Now
                </Button>
              )}

              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2" 
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                Share Event
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}