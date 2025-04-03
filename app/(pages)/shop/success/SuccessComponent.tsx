"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useCartStore from '@/store'
import { CheckCircle, Home, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const SuccessComponentPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const orderNumber = searchParams.get('orderNumber')
    const sessionId = searchParams.get('session_id')
    const { resetCart } = useCartStore()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (orderNumber && sessionId) {
            // Reset cart and finish loading
            resetCart()
            setIsLoading(false)
        } else {
            router.push("/shop")
        }
    }, []) // Empty dependency array - run only once when component mounts

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100 }
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="text-center">
                    <div className="animate-spin h-12 w-12 border-4 border-blue-600 rounded-full border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">Processing your order...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 py-12 flex items-center justify-center">
            <div className="container max-w-lg mx-auto px-4">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-8"
                >
                    {/* Order confirmation card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden text-center p-8"
                    >
                        <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                            <CheckCircle className="h-14 w-14 text-green-600 dark:text-green-400" />
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Order Confirmed!</h1>

                        <div className="mb-6 space-y-2">
                            <p className="text-slate-600 dark:text-slate-400">
                                Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400">
                                We've sent a confirmation email with your order details.
                            </p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4 mb-8">
                            <p className="text-slate-600 dark:text-slate-400 text-sm">Order ID</p>
                            <p className="font-medium text-slate-800 dark:text-white">{orderNumber}</p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/shop" className="w-full sm:w-auto">
                                <Button variant="outline" className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2">
                                    <Home className="w-4 h-4" />
                                    <span>Home</span>
                                </Button>
                            </Link>
                            <Link href="/shop/orders" className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                                    <ShoppingBag className="w-4 h-4" />
                                    <span>My Orders</span>
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default SuccessComponentPage