"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MinusIcon, PlusIcon, TruckIcon, CreditCardIcon, RotateCcwIcon } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import QuantityButton from "./QuantityButton";
export default function ProductInfo({ product }) {


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 px-4 md:px-8"
        >
            <div className="space-y-4">
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-4xl font-bold text-gray-900 dark:text-white"
                >
                    {product.title}
                </motion.h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">{product.intro}</p>
            </div>

            <div className="flex items-baseline space-x-4">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">₹{product.discount}</span>
                {product.discount > 0 && (
                    <span className="text-xl text-gray-500 line-through">₹{product.price}</span>
                )}
            </div>

            <div className="prose prose-gray dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
            </div>

            <div className="flex flex-col space-y-6">
                <QuantityButton product={product}></QuantityButton>
                <AddToCartButton product={product} />
            </div>

            <div className="flex items-center space-x-4 text-sm">
                <span className={`px-3 py-1 rounded-full ${product.stock > 0
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
                <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {product.variant}
                </span>
                {product.status === "hot" && (
                    <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-medium">
                        Hot
                    </span>
                )}
            </div>

            {/* Additional Info Section */}
            <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <TruckIcon className="text-blue-600 dark:text-blue-400" size={20} />
                    <span className="text-gray-800 dark:text-gray-300">Free Shipping on orders above ₹999</span>
                </div>
                <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <CreditCardIcon className="text-green-600 dark:text-green-400" size={20} />
                    <span className="text-gray-800 dark:text-gray-300">Secure Payment Methods: UPI, Credit/Debit Cards, Net Banking</span>
                </div>
                <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <RotateCcwIcon className="text-red-600 dark:text-red-400" size={20} />
                    <span className="text-gray-800 dark:text-gray-300">Easy Returns within 7 Days</span>
                </div>
            </div>
        </motion.div>
    );
}
