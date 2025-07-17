// src/components/PromoBar.tsx (Updated Code)

import { motion } from 'framer-motion';
import { Flame, Gift, Bell } from 'lucide-react';
import LiveClock from './LiveClock';

const PromoBar = () => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black via-purple-900/50 to-black text-white py-3 shadow-lg shadow-purple-500/20 overflow-hidden border-b border-purple-500/30"
    >
      {/* Animated background shine effect */}
      <motion.div
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
          {/* SALE TEXT */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-2">
  <Flame className="w-4 h-4 text-red-500 animate-pulse" />
  <span className="font-cyber font-bold uppercase">
    Mega Sale: <span className="text-yellow-400">90% OFF</span>
  </span>
</div>

{/* OFFER CODE */}
<div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4">
  <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 animate-glow" />
  <span className="font-cyber font-bold text-xs sm:text-sm text-white uppercase">
    Use Code:
  </span>
  <div className="bg-black/50 rounded-md px-2 py-[2px] sm:px-3 sm:py-1 border border-green-500/50">
    <span className="font-cyber font-black text-xs sm:text-sm text-green-400 tracking-wide">
      CYBER2024
    </span>
  </div>
</div>


          {/* TIME */}
          <div className="hidden md:flex items-center justify-center space-x-3">
            <Bell className="w-5 h-5 text-cyan-400" />
            <span className="font-cyber font-bold text-sm text-white uppercase">Limited Time!</span>
            <div className="bg-black/50 rounded-md px-3 py-1 border border-cyan-500/50">
                <span className="font-mono text-sm font-bold text-cyan-300 shadow-neon-cyan">
                    {/* The LiveClock component now renders the time, which is already visible */}
                    <LiveClock />
                </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// We will remove the LiveClock from here and assume it's in its own file
// as per our previous steps to keep components separate.
export default PromoBar;