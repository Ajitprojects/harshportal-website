// src/components/ProductCardSkeleton.tsx (Cyber Glow Version)

import React from 'react';
import { motion } from 'framer-motion';

const ProductCardSkeleton = () => {
  return (
    <motion.div
      className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black p-[2px] rounded-3xl shadow-lg shadow-cyan-500/10 hover:shadow-purple-500/20 transition-all duration-500"
    >
      <div className="relative bg-black/60 backdrop-blur-md rounded-[22px] p-4 flex flex-col items-center text-center h-full w-full overflow-hidden animate-pulse">
        
        {/* Shine effect */}
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        {/* Image Placeholder */}
        <div className="w-full h-48 bg-gray-700 rounded-xl mb-4"></div>

        {/* Title */}
        <div className="h-4 w-3/4 bg-gray-700 rounded mb-2"></div>

        {/* Description */}
        <div className="h-3 w-full bg-gray-700 rounded mb-2"></div>
        <div className="h-3 w-2/3 bg-gray-700 rounded mb-4"></div>

        {/* Price */}
        <div className="h-4 w-1/3 bg-gray-700 rounded mb-4"></div>

        {/* Stars */}
        <div className="flex gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-700 rounded-full"></div>
          ))}
        </div>

        {/* View Details Button Placeholder */}
        <div className="h-3 w-1/4 bg-gray-700 rounded mb-4"></div>

        {/* Cart Button */}
        <div className="h-10 w-full bg-gray-700 rounded-lg mt-auto"></div>
      </div>
    </motion.div>
  );
};

export default ProductCardSkeleton;
