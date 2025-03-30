"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/shop/Container";
import EventCard from "./EventCard";
import Link from "next/link";

const EVENTS_QUERY_URL =
    "https://aiqtrfyk.api.sanity.io/v2025-01-26/data/query/production?query=*%5B_type+%3D%3D+%22event%22%5D+%7C+order%28_createdAt+desc%29+%5B0..2%5D+%7B%0A++_id%2C%0A++name%2C%0A++description%2C%0A++images%5B%5D+%7B+%22url%22%3A+asset-%3Eurl+%7D%2C%0A++eventDate%2C%0A++eventTime%2C%0A++location%2C%0A++organizer%2C%0A++registrationLink%0A%7D%0A%0A";

export default function Events() {
    const [latestEvents, setLatestEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch(EVENTS_QUERY_URL);
                const data = await response.json();
                setLatestEvents(data.result || []);
            } catch (err) {
                setError("Failed to load events");
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    return (

        <section className="relative py-20 overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
            {/* Animated Geometric Shapes */}
            <div className="absolute top-16 left-16 w-24 h-24 rounded-full bg-cyan-400/30 z-10 animate-bounce" />
            <div className="absolute bottom-16 right-16 w-36 h-36 rotate-45 bg-blue-400/30 z-10 animate-pulse" />
            <div className="absolute bottom-1/4 left-1/3 w-28 h-28 rounded-full bg-emerald-400/30 z-10 animate-bounce" />

            <Container>
                <h2 className="text-5xl font-bold text-center mb-12 text-white">Events</h2>

                {loading ? (
                    <p className="text-white text-center">Loading events...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : latestEvents.length === 0 ? (
                    <p className="text-white text-center">No events available</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-3 mx-auto gap-5 w-[90%]">
                            {latestEvents.map((event, index) => (
                                <motion.div
                                    key={event._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    <EventCard event={event} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-8">
                            <Link
                                href="/events"
                                className="border-2 border-white px-6 py-2 rounded-lg transition-transform hover:scale-110 text-white font-semibold"
                            >
                                More Events
                            </Link>
                        </div>
                    </>
                )}
            </Container>
        </section>
    );
}