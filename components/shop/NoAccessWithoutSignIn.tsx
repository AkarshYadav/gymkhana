"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";

export default function NoAccessWithoutSignIn() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-100 to-slate-300 dark:from-gray-900 dark:to-gray-800"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <Card className="w-[90%] max-w-lg shadow-2xl rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                    <CardHeader className="flex flex-col items-center">
                        <Image
                            src="/gymkhana1.png"
                            alt="Gymkhana Logo"
                            width={100}
                            height={100}
                            className=" mb-4 "
                        />
                        <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Access Denied
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-6">
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Please sign in to continue.
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <SignInButton mode="modal">
                                <Button
                                    variant="default"
                                    size="lg"
                                    className="w-full bg-black hover:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    Sign In to Continue
                                </Button>
                            </SignInButton>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
