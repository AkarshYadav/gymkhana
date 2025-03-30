"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface CommitteeHeroProps {
    name: string
    description: string
    imageUrl: string
    theme: "technical" | "sports" | "cultural" | "welfare"
}

export default function CommitteeHero({ name, description, imageUrl, theme }: CommitteeHeroProps) {
    const themeStyles = {
        technical: {
            gradient: "from-blue-600 via-blue-700 to-indigo-900",
            accent: "bg-blue-400",
            text: "text-blue-400",
            shapes: "bg-blue-300/20",
            pattern: "url('/patterns/circuit-board.png')",
            particleColor: "#60a5fa",
        },
        sports: {
            gradient: "from-orange-600 via-red-600 to-rose-900",
            accent: "bg-orange-400",
            text: "text-orange-400",
            shapes: "bg-orange-300/20",
            pattern: "url('/patterns/sports-pattern.png')",
            particleColor: "#fb923c",
        },
        cultural: {
            gradient: "from-purple-600 via-purple-700 to-fuchsia-900",
            accent: "bg-purple-400",
            text: "text-purple-400",
            shapes: "bg-purple-300/20",
            pattern: "url('/patterns/artistic-pattern.png')",
            particleColor: "#c084fc",
        },
        academics: {
            gradient: "from-emerald-600 via-green-700 to-green-900",
            accent: "bg-emerald-400",
            text: "text-emerald-400",
            shapes: "bg-emerald-300/20",
            pattern: "url('/patterns/leaves-pattern.png')",
            particleColor: "#34d399",
        },
    }

    const styles = themeStyles[theme]

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    }

    const lineVariants = {
        hidden: { width: 0 },
        visible: {
            width: "150px",
            transition: { duration: 1, ease: "easeOut" },
        },
    }

    // Decorative shapes animations
    const floatingShapes = [
        { id: 1, delay: 0, x: -150, y: -30, size: 15, duration: 5 },
        { id: 2, delay: 0.5, x: 150, y: 20, size: 20, duration: 7 },
        { id: 3, delay: 1, x: -60, y: 70, size: 25, duration: 8 },
        { id: 4, delay: 1.5, x: 80, y: -60, size: 10, duration: 6 },
        { id: 5, delay: 2, x: 200, y: 80, size: 30, duration: 9 },
    ]

    return (
        <section className={`relative overflow-hidden bg-gradient-to-br ${styles.gradient} py-28 md:py-40`}>
            {/* Background patterns and decorative elements */}
            <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: styles.pattern, backgroundSize: "cover" }}
            ></div>

            {/* Decorative floating shapes */}
            {floatingShapes.map((shape) => (
                <motion.div
                    key={shape.id}
                    className={`absolute rounded-full ${styles.shapes}`}
                    style={{
                        width: shape.size,
                        height: shape.size,
                    }}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{
                        x: [shape.x, -shape.x, shape.x],
                        y: [shape.y, -shape.y, shape.y],
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: shape.duration,
                        delay: shape.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute rounded-full w-2 h-2"
                        style={{
                            backgroundColor: styles.particleColor,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.7, 0],
                            scale: [0, 1, 0],
                            x: [0, (Math.random() - 0.5) * 100],
                            y: [0, (Math.random() - 0.5) * 100],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: Math.random() * 5,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Background image overlay */}
            <div className="absolute inset-0 opacity-20">
                <Image
                    src={imageUrl || "/placeholder.svg?height=1080&width=1920"}
                    alt={name}
                    fill
                    className="object-cover mix-blend-overlay"
                    priority
                />
            </div>

            {/* Main content */}
            <div className="container relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-3xl mx-auto text-center"
                >
                    <motion.div variants={lineVariants} className={`h-1 ${styles.accent} mx-auto mb-8`} />

                    <motion.div variants={itemVariants} className="mb-6">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">{name}</h1>
                        <div className="h-0.5 w-24 bg-white/30 mx-auto my-6"></div>
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
                        {description}
                    </motion.p>

                    <motion.div variants={lineVariants} className={`h-1 ${styles.accent} mx-auto mt-8 w-24`} />
                </motion.div>
            </div>

            {/* Bottom wave/curve decoration */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 120L48 108C96 96 192 72 288 66C384 60 480 72 576 78C672 84 768 84 864 78C960 72 1056 60 1152 54C1248 48 1344 48 1392 48L1440 48V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
                        fill="white"
                        className="dark:fill-gray-900"
                    />
                </svg>
            </div>
        </section>
    )
}

