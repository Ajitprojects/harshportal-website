// src/pages/OrderConfirmationPage.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 pt-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center bg-gray-800 p-10 rounded-2xl shadow-lg"
      >
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white mb-2">Thank You For Your Order!</h1>
        <p className="text-gray-400 mb-6">Your order has been placed successfully.<br/>Details have been sent to your email.</p>
        <Link to="/">
          <button className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold">
            Continue Shopping
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;