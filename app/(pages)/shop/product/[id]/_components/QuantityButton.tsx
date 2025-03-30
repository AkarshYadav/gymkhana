"use client";

import { motion } from "framer-motion";
import { MinusIcon, PlusIcon } from "lucide-react";
import useCartStore from "@/store";
import toast from "react-hot-toast";

function QuantityButton({ product }) {
    const { incrementQuantity, decrementQuantity, getItemCount } = useCartStore();
    const itemCount = getItemCount(product._id);

    const handleIncrement = () => {
        incrementQuantity(product._id);
        toast.success(`${product.title.substring(0, 12)}... quantity increased`);
    };

    const handleDecrement = () => {
        decrementQuantity(product._id);
        toast.success(`${product.title.substring(0, 12)}... quantity decreased`);
    };
 console.log(itemCount)
    return (
        <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-300">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Quantity
            </span>
            <div className="flex items-center space-x-3">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDecrement}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:cursor-pointer"
                    disabled={itemCount <= 1}
                >
                    <MinusIcon size={16} />
                </motion.button>
                <span className="w-8 text-center font-medium">{itemCount}</span>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleIncrement}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:cursor-pointer"
                    disabled={itemCount >= product.stock}
                >
                    <PlusIcon size={16} />
                </motion.button>
            </div>
        </div>
    );
}

export default QuantityButton;