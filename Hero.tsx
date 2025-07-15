import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Play, Star, Crown, Cpu, Wifi, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-44 pb-20">
      {/* Enhanced Background with better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}
          />
        </div>

        {/* Subtle gradient overlays for better text contrast */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-pink-500/15 to-green-500/15 rounded-full blur-3xl"
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Enhanced Badge with better contrast */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-3 bg-black/60 backdrop-blur-xl rounded-2xl px-8 py-4 border border-cyan-500/50 shadow-2xl shadow-cyan-500/20"
          >
            <Crown className="w-6 h-6 text-yellow-400" />
            <span className="text-white font-bold text-lg tracking-wider">INDIA'S #1 DIGITAL STORE</span>
            <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
          </motion.div>

          {/* Main Heading with better text shadow and spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
              <span 
                className="block text-white mb-4"
                style={{
                  textShadow: '0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3)',
                  background: 'linear-gradient(45deg, #ffffff, #00ffff, #ffffff)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradientShift 3s ease-in-out infinite'
                }}
              >
                GET PREMIUM
              </span>
              <span 
                className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4"
                style={{
                  textShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
                }}
              >
                DIGITAL SERVICES
              </span>
              <span 
                className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cyan-400"
                style={{
                  textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
                }}
              >
                AT LOWEST PRICES
              </span>
            </h1>
          </motion.div>

          {/* Enhanced Subtitle with better contrast */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed mb-4 px-4">
              Access Netflix, Amazon Prime, Disney+, Spotify & more at{' '}
              <span 
                className="text-green-400 font-bold"
                style={{
                  textShadow: '0 0 10px rgba(34, 197, 94, 0.5)'
                }}
              >
                90% DISCOUNT
              </span>
            </p>
            <p className="text-lg text-gray-300 px-4">
              Genuine accounts • Instant delivery • Lifetime warranty included!
            </p>
          </motion.div>

          {/* Enhanced CTA Buttons with better spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl flex items-center space-x-3 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
            >
              <span>EXPLORE SERVICES</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-black/60 backdrop-blur-xl border-2 border-cyan-500/50 text-cyan-400 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300 flex items-center space-x-3"
            >
              <Play className="w-6 h-6" />
              <span>WATCH DEMO</span>
            </motion.button>
          </motion.div>

          {/* Enhanced Stats with better spacing and contrast */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto pt-16"
          >
            {[
              { icon: Star, number: "100K+", label: "HAPPY CUSTOMERS", color: "text-yellow-400" },
              { icon: Zap, number: "500+", label: "DIGITAL SERVICES", color: "text-cyan-400" },
              { icon: Crown, number: "30 SEC", label: "INSTANT DELIVERY", color: "text-green-400" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center bg-black/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <stat.icon className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} mx-auto mb-4`} />
                <div 
                  className="text-3xl sm:text-4xl font-black text-white mb-2"
                  style={{
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
                  }}
                >
                  {stat.number}
                </div>
                <div className="text-cyan-400 text-sm font-bold tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Trust Indicators with better spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-12"
          >
            {[
              { icon: Shield, text: "SSL SECURED" },
              { icon: Zap, text: "INSTANT DELIVERY" }, 
              { icon: Crown, text: "LIFETIME WARRANTY" },
              { icon: Cpu, text: "PREMIUM QUALITY" },
              { icon: Wifi, text: "24/7 SUPPORT" }
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-cyan-300 text-sm font-bold bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-cyan-500/20">
                <feature.icon className="w-4 h-4 text-cyan-400" />
                <span>{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-8 h-12 border-2 border-cyan-500 rounded-full flex justify-center shadow-lg shadow-cyan-500/30">
          <div className="w-2 h-4 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>

      <style >{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
      `}</style>
    </section>
  );
};

export default Hero;