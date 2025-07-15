import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Crown, Zap } from 'lucide-react';

const PricingTiers = () => {
  const tiers = [
    {
      name: 'Starter',
      icon: Zap,
      price: 299,
      originalPrice: 499,
      period: '/month',
      description: 'Perfect for individuals',
      features: [
        '5 OTT Account Access',
        'Basic IPTV Package',
        'Email Support',
        'Mobile App Access',
        '720p Streaming Quality'
      ],
      popular: false,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Professional',
      icon: Star,
      price: 599,
      originalPrice: 999,
      period: '/month',
      description: 'Most popular choice',
      features: [
        '15 OTT Account Access',
        'Premium IPTV Package',
        'Priority Support',
        'Multi-device Access',
        '4K Streaming Quality',
        'Download Feature',
        'Ad-free Experience'
      ],
      popular: true,
      color: 'from-accent-500 to-primary-500'
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: 999,
      originalPrice: 1499,
      period: '/month',
      description: 'For power users',
      features: [
        'Unlimited OTT Access',
        'Premium+ IPTV Package',
        '24/7 Phone Support',
        'Family Sharing (5 users)',
        '8K Streaming Quality',
        'Offline Downloads',
        'Custom Playlists',
        'API Access'
      ],
      popular: false,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Choose Your
            <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
              {" "}Perfect Plan
            </span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Flexible pricing options designed to scale with your entertainment needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border ${
                tier.popular ? 'border-accent-500 scale-105' : 'border-white/10'
              } hover:border-white/20 transition-all duration-300`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-accent-500 to-primary-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <tier.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-2xl mb-2">{tier.name}</h3>
                <p className="text-white/60 text-sm mb-4">{tier.description}</p>
                
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-white/50 line-through text-lg">₹{tier.originalPrice}</span>
                  <span className="text-white font-bold text-4xl">₹{tier.price}</span>
                  <span className="text-white/60 text-sm">{tier.period}</span>
                </div>
                <div className="text-green-400 text-sm font-medium">
                  Save {Math.round(((tier.originalPrice - tier.price) / tier.originalPrice) * 100)}%
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-accent-500 to-primary-500 hover:shadow-lg'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;