"use client";

import { motion } from "framer-motion";
import { ShoppingBagIcon, ArrowRightIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EmptyCartComponent() {
  const router = useRouter();

  // Animation variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-slate-800">
          <CardHeader className="pb-0 pt-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
              className="flex justify-center mb-4"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                >
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-300 to-indigo-300 dark:from-blue-500 dark:to-indigo-500 rounded-full opacity-70"></div>
                </motion.div>
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
                  <ShoppingBagIcon className="w-12 h-12 text-blue-500 dark:text-blue-400" />
                </div>
              </div>
            </motion.div>
            <CardTitle className="text-2xl font-bold text-center text-slate-800 dark:text-white">
              Your Cart is Empty
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pt-6 pb-8 px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.p variants={itemVariants} className="text-slate-600 dark:text-slate-300 text-center">
                Looks like you haven't added anything to your cart yet.
                Discover our amazing products and start shopping!
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="pt-2"
              >
                <Button
                  variant="default"
                  className="w-full py-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-medium text-base group transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={() => router.push("/shop")}
                >
                  <span className="mr-2">Browse Products</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRightIcon className="w-5 h-5 inline-block" />
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}