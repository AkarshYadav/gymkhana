"use client"
import React from 'react';
import Title from '../Title';
import { motion } from 'framer-motion';

function HomeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-16 px-6 md:px-24 rounded-2xl shadow-2xl overflow-hidden mx-4 md:mx-auto max-w-7xl"
    >
      <div className="absolute inset-0 bg-noise opacity-10" />
      <div className="relative z-10">
        <Title className="text-4xl md:text-6xl font-extrabold text-center uppercase tracking-wide mb-6 drop-shadow-xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-400"
          >
            Wear Your Institute Pride
          </motion.span>
        </Title>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-center leading-relaxed max-w-3xl mx-auto font-medium text-gray-100"
        >
          Discover limited-edition apparel that celebrates your campus journey.
          From iconic club merch to memorable event collectibles - your story,
          your style!
        </motion.p>
      </div>
    </motion.div>
  );
}

export default HomeBanner;