import React from 'react';
import { motion } from 'framer-motion';
import PricingTiers from '../components/PricingTiers';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-44">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Pricing
            <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
              {" "}Plans
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your digital entertainment needs. All plans include warranty and instant delivery.
          </p>
        </motion.div>
        
        <PricingTiers />
      </div>
    </div>
  );
};

export default Pricing;