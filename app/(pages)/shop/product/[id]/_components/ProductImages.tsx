"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

interface Image {
    _type: string;
    _key: string;
    asset: {
        _ref: string;
        _type: string;
    };
}

export default function ProductImages({ images }: { images: Image[] }) {

    const [currentImage, setCurrentImage] = useState(images[0]);
    if (!images || !Array.isArray(images)) {
        return (
            <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
                <p>No images available</p>
            </div>
        );
    }
    return (
        <div className="space-y-6">
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-square relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-900"
                >
                    <Image
                        src={urlFor(currentImage).url()}
                        alt="Product image"
                        width={700}
                        height={700}
                        priority
                        className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <motion.div
                        className="absolute inset-0 bg-black/5 dark:bg-white/5"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                    />
                </motion.div>
            </AnimatePresence>
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => {
                    const imageUrl = image?.asset ? urlFor(image).url() : '/placeholder.jpg';
                    return (
                        <motion.button
                            key={image?._key}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentImage(image)}
                            className={`group aspect-square relative overflow-hidden rounded-xl 
                            ${image === currentImage
                                    ? "ring-2 ring-blue-500 dark:ring-blue-400"
                                    : "ring-1 ring-gray-200 dark:ring-gray-800"}`}
                        >
                            <Image
                                src={imageUrl}
                                alt={`Product thumbnail ${index + 1}`}
                                width={100}
                                height={100}
                                className="object-cover transition-all duration-300 group-hover:brightness-90"
                            />
                        </motion.button>
                    )
                })}
            </div>
        </div>
    );
}