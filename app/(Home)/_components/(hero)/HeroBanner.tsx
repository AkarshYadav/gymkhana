"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function HeroBanner() {
    const textRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { scrollYProgress } = useScroll({
        target: textRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <div className="relative h-screen overflow-hidden">
            {/* Video Background */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/video3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark overlay with reduced opacity for better text visibility */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Motion container for logo and text */}
            <motion.div
                ref={textRef}
                style={{ y, opacity }}
                className="absolute inset-0 text-center text-white z-10 flex flex-col items-center justify-center space-y-4"
            >
                {/* Logo Section */}
                <Image
                    src="/gymkhana1.png"
                    alt="Gymkhana Logo"
                    width={160}
                    height={160}
                    className="object-contain md:h-60 md:w-60 h-40 w-40"
                    priority
                />

                {/* Text Section */}
                <div>
                    <h1 className="text-5xl text-orange-500 md:text-7xl font-bold mb-4">Gymkhana</h1>
                    <h2 className="text-3xl md:text-5xl font-semibold">IIIT Vadodara</h2>
                </div>
            </motion.div>
        </div>
    );
}