import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

interface Product {
    _id: string;
    images: { url: string }[];
    title: string;
    intro: string;
    variant: string;
    price: number;
    discount: number;
    status?: string;
    stock: number;
}

interface ShoppingGridProps {
    products: Product[];
}

const ShoppingGrid: React.FC<ShoppingGridProps> = ({ products }) => {
    // Function to calculate discount percentage
    const calculateDiscount = (price, discountPrice) => {
        return Math.round(((price - discountPrice) / price) * 100);
    };

    // Function to format price in Indian Rupees
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(price);
    };

    return (
        <div className="container mx-auto px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products?.map((product) => (
                    <Link key={product._id}
                        href={`/shop/product/${product?._id}`}
                        passHref>
                        <Card className="group hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                            <CardHeader className="p-0 relative aspect-square overflow-hidden">

                                <Image
                                    src={product.images[0].url}
                                    alt={product.title}
                                    className="w-full h-70 object-contain overflow-hidden group-hover:scale-110 transition-transform duration-300"
                                    width={500}
                                    height={500}
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 dark:bg-gradient-to-b dark:from-transparent dark:to-slate-700 " />

                                {product.status && (
                                    <Badge className="absolute top-4 left-4 uppercase bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900">
                                        {product.status}
                                    </Badge>
                                )}
                                {product.stock <= 0 && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <span className="text-white font-semibold text-lg">Out of Stock</span>
                                    </div>
                                )}
                            </CardHeader>

                            <CardContent className="p-6">
                                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                    {product.variant}
                                </div>
                                <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-gray-800 dark:text-gray-100">
                                    {product.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                                    {product.intro}
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                        {formatPrice(product.discount)}
                                    </span>
                                    {product.discount < product.price && (
                                        <>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                                {formatPrice(product.price)}
                                            </span>
                                            <Badge variant="destructive" className="ml-auto bg-red-600 text-white">
                                                {calculateDiscount(product.price, product.discount)}% OFF
                                            </Badge>
                                        </>
                                    )}
                                </div>
                            </CardContent>

                            <CardFooter className="p-6 pt-0">
                                <button
                                    className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-white 
             bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all 
             duration-300 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_4px_20px_rgba(255,105,180,0.5)] 
             hover:bg-gradient-to-l
             disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={product.stock <= 0}
                                >
                                    <ShoppingCart size={18} />
                                    View Details
                                </button>

                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ShoppingGrid;
