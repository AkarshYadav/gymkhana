"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface Committee {
  _id: string
  name: string
  description: string
  imageUrl: string
}

async function getCommittees(): Promise<Committee[]> {
  const query = `*[_type == 'committee']{
    _id,
    name,
    description,
    "imageUrl": image.asset->url
  }`

  const url = `https://aiqtrfyk.api.sanity.io/v2025-01-26/data/query/production?query=${encodeURIComponent(query)}`

  try {
    const response = await fetch(url, { next: { revalidate: 60 } })
    const data = await response.json()
    return data.result || []
  } catch (error) {
    console.error("Error fetching committees:", error)
    return []
  }
}

export default function Committees() {
  const [committees, setCommittees] = useState<Committee[]>([])

  useEffect(() => {
    const fetchCommittees = async () => {
      const data = await getCommittees()
      setCommittees(data)
    }

    fetchCommittees()
  }, [])

  // Get theme colors based on committee name
  const getThemeColor = (committeeName: string) => {
    switch (committeeName.toLowerCase()) {
      case "technical":
        return {
          bg: "bg-blue-500/10",
          text: "text-blue-600 dark:text-blue-400",
          border: "border-blue-200 dark:border-blue-800",
          hover: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
          icon: "text-blue-500",
        }
      case "sports":
        return {
          bg: "bg-orange-500/10",
          text: "text-orange-600 dark:text-orange-400",
          border: "border-orange-200 dark:border-orange-800",
          hover: "hover:bg-orange-50 dark:hover:bg-orange-900/20",
          icon: "text-orange-500",
        }
      case "cultural":
        return {
          bg: "bg-purple-500/10",
          text: "text-purple-600 dark:text-purple-400",
          border: "border-purple-200 dark:border-purple-800",
          hover: "hover:bg-purple-50 dark:hover:bg-purple-900/20",
          icon: "text-purple-500",
        }
      case "welfare":
        return {
          bg: "bg-green-500/10",
          text: "text-green-600 dark:text-green-400",
          border: "border-green-200 dark:border-green-800",
          hover: "hover:bg-green-50 dark:hover:bg-green-900/20",
          icon: "text-green-500",
        }
      default:
        return {
          bg: "bg-blue-500/10",
          text: "text-blue-600 dark:text-blue-400",
          border: "border-blue-200 dark:border-blue-800",
          hover: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
          icon: "text-blue-500",
        }
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4"
          >
            Our Committees
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-primary mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Explore our diverse committees and discover the various clubs and activities they offer
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {committees.map((committee) => {
            const theme = getThemeColor(committee.name)
            return (
              <motion.div key={committee._id} variants={item}>
                <Link href={`/committees/${committee._id}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className={`relative rounded-xl overflow-hidden border ${theme.border} shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 ${theme.hover}`}
                  >
                    {committee.imageUrl && (
                      <div className="h-40 relative overflow-hidden">
                        <Image
                          src={committee.imageUrl || "/placeholder.svg"}
                          alt={committee.name}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-xl font-bold text-white">{committee.name}</h3>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      {!committee.imageUrl && (
                        <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>{committee.name}</h3>
                      )}
                      <p className="text-muted-foreground dark:text-gray-300 line-clamp-3 mb-4">
                        {committee.description || "Explore the clubs and activities under this committee"}
                      </p>

                      <div className="flex justify-end">
                        <motion.div
                          whileHover={{ x: 5 }}
                          className={`flex items-center gap-1 text-sm font-medium ${theme.text}`}
                        >
                          Explore <ArrowRight size={16} />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

