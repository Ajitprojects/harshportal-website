import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Award, Users, Zap, Lock } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    { icon: Shield, text: 'SSL Secured', subtext: '256-bit encryption' },
    { icon: Clock, text: 'Instant Delivery', subtext: 'Within 5 minutes' },
    { icon: Award, text: 'Premium Quality', subtext: 'Verified accounts' },
    { icon: Users, text: '50K+ Customers', subtext: 'Trusted worldwide' },
    { icon: Zap, text: '99.9% Uptime', subtext: 'Reliable service' },
    { icon: Lock, text: 'Secure Payment', subtext: 'Multiple gateways' }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Why Choose Harshportal?</h3>
          <p className="text-gray-400">Trusted by thousands of customers worldwide</p>
        </motion.div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group cursor-pointer"
            >
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <badge.icon className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                </div>
                <h4 className="text-white font-semibold text-sm mb-2 group-hover:text-cyan-400 transition-colors">
                  {badge.text}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors">
                  {badge.subtext}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Trust Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>99.9% Customer Satisfaction</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>24/7 Customer Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>Money Back Guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;