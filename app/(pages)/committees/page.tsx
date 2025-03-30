"use client"

import { Suspense } from "react";
import { motion } from "framer-motion";
import Committees from "./_components/committees";
import { Button } from "@/components/ui/button";


export default function Home() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
           

            <section className="py-12 text-gray-900 dark:text-white bg-white dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    <Suspense fallback={<div className="py-24 text-center text-lg">Loading committees...</div>}>
                        <Committees />
                    </Suspense>
                </div>
            </section>
        </motion.div>
    );
}
