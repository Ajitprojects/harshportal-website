// src/pages/NotFoundPage.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-cyber-grid bg-[length:50px_50px] text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-md"
      >
        <motion.div
          animate={{
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <AlertTriangle className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl font-black text-white leading-tight">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mt-2">
          Page Not Found
        </h2>
        <p className="text-gray-400 mt-4 mb-8">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        
        <Link to="/" className="cursor-hover-link">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 255, 0.4)" }}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 mx-auto"
          >
            <Home className="w-5 h-5" />
            <span>Go Back to Home</span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;