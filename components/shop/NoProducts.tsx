"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const NoProducts = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center space-y-4 p-6"
        >
            <motion.div
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
                <ShoppingBag className="text-gray-500 dark:text-gray-400 w-16 h-16" />
            </motion.div>

            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-xl font-semibold text-gray-700 dark:text-gray-300"
            >
                No Products Available
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-gray-500 dark:text-gray-400"
            >
                New arrivals coming soon. Stay tuned! 🚀
            </motion.p>
        </motion.div>
    );
};

export default NoProducts;
