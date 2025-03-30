"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import Container from "@/components/shop/Container"
import { Button } from "@/components/ui/button";
import Link from "next/link"

interface Product {
  _id: string;
  images: { url: string }[];
  title: string;
  intro: string;
  price: number;
}

interface ShoppingSectionProps {
  latestProducts: Product[];
}


export default function ShoppingSection({ latestProducts }: ShoppingSectionProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900" />
      <Container>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">Latest Products</h2>
            <p className="text-gray-400 text-lg">Check out our newest arrivals</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestProducts.slice(0, 3).map((product, index) => (
              <Link key={product._id}
                href={`/shop/product/${product?._id}`}
                passHref>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group"
                >
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={product.images[0]?.url || "/placeholder.svg"}
                        alt={product.title}
                        width={500}
                        height={500}
                        className="object-contain overflow-hidden w-full h-full
                       transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100/70 mb-2">{product.intro}</h3>
                      <p className="text-2xl font-bold text-purple-400 mb-4">${product.price}</p>

                      <button className="mt-6 w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
                        <ShoppingCart size={20} />
                        Product Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/shop">
              <Button variant={"outline"}
                size={"lg"}
                className="rounded-full hover:scale-105">Visit Shop</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
