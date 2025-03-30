"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ClubCardProps {
  id: string
  name: string
  description: string
  imageUrl: string
  committeeName: string
  index: number
}

export default function ClubCard({ id, name, description, imageUrl, committeeName, index }: ClubCardProps) {
  // Get theme colors based on committee name
  const getThemeColor = () => {
    switch (committeeName.toLowerCase()) {
      case "technical":
        return {
          bg: "bg-blue-500",
          text: "text-blue-500",
          border: "border-blue-200",
          hover: "hover:bg-blue-600",
          gradient: "from-blue-500/20 to-indigo-600/20",
          shadow: "shadow-blue-500/10",
        }
      case "sports":
        return {
          bg: "bg-orange-500",
          text: "text-orange-500",
          border: "border-orange-200",
          hover: "hover:bg-orange-600",
          gradient: "from-orange-500/20 to-red-600/20",
          shadow: "shadow-orange-500/10",
        }
      case "cultural":
        return {
          bg: "bg-purple-500",
          text: "text-purple-500",
          border: "border-purple-200",
          hover: "hover:bg-purple-600",
          gradient: "from-purple-500/20 to-fuchsia-600/20",
          shadow: "shadow-purple-500/10",
        }
      case "welfare":
        return {
          bg: "bg-green-500",
          text: "text-green-500",
          border: "border-green-200",
          hover: "hover:bg-green-600",
          gradient: "from-green-500/20 to-emerald-600/20",
          shadow: "shadow-green-500/10",
        }
      default:
        return {
          bg: "bg-blue-500",
          text: "text-blue-500",
          border: "border-blue-200",
          hover: "hover:bg-blue-600",
          gradient: "from-blue-500/20 to-indigo-600/20",
          shadow: "shadow-blue-500/10",
        }
    }
  }

  const theme = getThemeColor()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <Link href={`/committees/${committeeName}/${id}`}>
        <div
          className={`bg-white  text-gray-900 dark:text-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transform transition-all duration-300 group hover:shadow-2xl dark:hover:shadow-xl hover:${theme.shadow}`}
        >
          <div className="relative h-48 overflow-hidden">
            {/* Background pattern - different for each committee type */}
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-30`}></div>

            <Image
              src={imageUrl || "/placeholder.svg?height=480&width=640"}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-2xl font-bold text-white group-hover:text-white transition-colors">{name}</h3>
            </div>
          </div>

          <div className="p-6">
            <p className="text-muted-foreground dark:text-gray-300 text-sm line-clamp-3 min-h-[4.5rem]">
              {description}
            </p>

            <div className="mt-6 flex justify-between items-center">
              <span className={`text-sm font-medium ${theme.text} dark:text-white`}>{committeeName}</span>

              <motion.div
                className={`w-8 h-8 rounded-full ${theme.bg} text-white flex items-center justify-center`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight size={16} />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

