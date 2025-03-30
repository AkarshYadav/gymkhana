"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCartIcon } from "lucide-react";
import useCartStore from "@/store";
import toast from "react-hot-toast";

interface Product {
    _id: string;
    title: string;
    price: number;
    discount: number;
    stock: number;
}

export default function AddToCartButton({ product }: { product: Product }) {

    const {addItem , getItemCount} = useCartStore();
    const itemCount = getItemCount(product._id);

    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = async () => {
        setIsLoading(true);
        try {
            // Add your cart logic here
            console.log(`Added ${product.title} to cart`);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error('Failed to add to cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <button
                disabled
                className="flex items-center justify-center space-x-2 w-full bg-blue-100 dark:bg-blue-900/30 
                    text-blue-500 dark:text-blue-400 py-4 px-6 rounded-xl font-medium animate-pulse"
            >
                <span>Adding to Cart...</span>
            </button>
        );
    }

    if (product.stock <= 0) {
        return (
            <button
                disabled
                className="flex items-center justify-center space-x-2 w-full bg-gray-300 dark:bg-gray-700 
                    text-gray-500 dark:text-gray-400 py-4 px-6 rounded-xl font-medium cursor-not-allowed"
            >
                <ShoppingCartIcon size={20} />
                <span>Out of Stock</span>
            </button>
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={
                ()=>{
                    addItem(product)
                    toast.success(`${product.title.substring(0,12)} ....added successfully`)
                }
              }
            className="flex items-center justify-center space-x-2 w-full bg-blue-600 dark:bg-blue-500 
                text-white py-4 px-6 rounded-xl font-medium hover:bg-blue-700 dark:hover:bg-blue-600 
                transition-colors shadow-lg shadow-blue-500/20"
        >
            <ShoppingCartIcon size={20} />
            <span>Add to Cart</span>
        </motion.button>
    );
}