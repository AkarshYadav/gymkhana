"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/shop/Container";
import Link from "next/link";

const queryUrl = "https://aiqtrfyk.api.sanity.io/v2025-01-26/data/query/production?query=*%5B_type+%3D%3D+%27committee%27%5D+%7C+order%28_createdAt+asc%29+%7B+_id%2C+name%2C+%22imageUrl%22%3A+image.asset-%3Eurl+%7D";

export default function Committees() {
  const [committees, setCommittees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommittees = async () => {
      try {
        const response = await fetch(queryUrl);
        const result = await response.json();
        setCommittees(result.result || []);
      } catch (err) {
        setError("Failed to load committees");
      } finally {
        setLoading(false);
      }
    };
    fetchCommittees();
  }, []);

  return (
    <section className="py-24  bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 ">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-center mb-16 text-orange-500 tracking-wide"
        >
          Our Committees
        </motion.h2>

        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white text-center text-xl"
          >
            Loading committees...
          </motion.p>
        ) : error ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-center text-xl"
          >
            {error}
          </motion.p>
        ) : committees.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white text-center text-xl"
          >
            No committees available
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-[90%]">
            {committees.map((committee, index) => (
              <motion.div
                key={committee._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative mx-auto my-6 group"
              >
                <Link
                  href={`/committees/${committee._id}`}
                  className="block relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out transform group-hover:scale-105"
                >
                  <div className="absolute rounded-3xl inset-0 bg-gradient-to-b from-transparent to-black opacity-70 transition-opacity duration-300 ease-in-out group-hover:opacity-90 z-10" />

                  <div className="relative w-[250px] md:w-[300px] xl:w-[460px] aspect-[4/3] rounded-3xl overflow-hidden">
                    <Image
                      src={committee.imageUrl || "/placeholder.svg"}
                      alt={committee.name}
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                      sizes="(max-width: 768px) 250px, (max-width: 1280px) 300px, 460px"
                    />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
                    <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:text-blue-400">
                      {committee.name}
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100"
                    >
                      Learn More
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
