// src/components/Hero.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Play, Star, Crown, Cpu, Wifi, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  const stats = [
    { icon: Star, label: "100K+ HAPPY CUSTOMERS", color: "text-yellow-400" },
    { icon: Zap, label: "500+ DIGITAL SERVICES", color: "text-cyan-400" },
    { icon: Crown, label: "INSTANT DELIVERY IN 30s", color: "text-green-400" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 25s linear infinite',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-gradient-to-r from-cyan-500/25 to-purple-500/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 sm:w-[500px] h-96 sm:h-[500px] bg-gradient-to-r from-pink-500/15 to-green-500/15 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
         className="space-y-6 sm:space-y-8 mt-[-1rem] sm:mt-[-2rem]"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-3 bg-black/60 backdrop-blur-xl rounded-2xl px-6 py-3 sm:px-8 sm:py-4 border border-cyan-500/50 shadow-2xl shadow-cyan-500/20"
          >
            <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
            <span className="text-white font-bold text-base sm:text-lg tracking-wider">
              INDIA'S #1 DIGITAL STORE
            </span>
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 animate-pulse" />
          </motion.div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
            <span className="block bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent animate-text-glow">
              GET PREMIUM
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mt-2 animate-text-glow">
              DIGITAL SERVICES
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl text-cyan-400 mt-2 tracking-wide animate-text-glow">
              AT LOWEST PRICES
            </span>
          </h1>

          {/* Typewriter Subtitle */}
          <p className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            <Typewriter
              words={['Netflix 🎬', 'Disney+ 🧞‍♂️', 'Amazon Prime 📦', 'Spotify 🎧', 'Hotstar ⚡']}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </p>

          <p className="text-sm sm:text-base text-gray-300">
            Instant delivery • Lifetime warranty • Verified accounts
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-6">
            <Link to="/pricing">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-lg animate-glow transition"
              >
                EXPLORE PLANS <ArrowRight className="inline-block ml-2" />
              </motion.button>
            </Link>
            <button className="border-2 border-cyan-500 text-cyan-400 px-8 py-3 sm:px-10 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-cyan-500/10 transition-all">
              <Play className="inline-block mr-2" /> WATCH DEMO
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-12 px-4">
            {stats.map(({ icon: Icon, label, color }, i) => (
              <motion.div
                key={i}
                className="text-center bg-black/40 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Icon className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 ${color}`} />
                <p className="text-base sm:text-xl font-bold text-white">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-10 px-2">
            {[Shield, Zap, Crown, Cpu, Wifi].map((Icon, i) => (
              <div
                key={i}
                className="flex items-center space-x-2 text-cyan-300 text-xs sm:text-sm font-bold bg-black/30 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-cyan-500/20 hover:border-cyan-400 transition"
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span className="whitespace-nowrap">
                  {["SSL SECURED", "INSTANT DELIVERY", "LIFETIME WARRANTY", "PREMIUM QUALITY", "24/7 SUPPORT"][i]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-8 h-12 border-2 border-cyan-500 rounded-full flex justify-center">
          <div className="w-2 h-4 bg-cyan-400 rounded-full mt-2 animate-ping" />
        </div>
      </motion.div>

      <style>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        .animate-text-glow {
          animation: textGlow 3s ease-in-out infinite;
        }
        @keyframes textGlow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(0,255,255,0.4), 0 0 20px rgba(0,255,255,0.2);
          }
          50% {
            text-shadow: 0 0 20px rgba(0,255,255,0.6), 0 0 30px rgba(0,255,255,0.3);
          }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 15px rgba(34,211,238,0.4); }
          50% { box-shadow: 0 0 25px rgba(34,211,238,0.8); }
        }
        .animate-glow {
          animation: glowPulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
