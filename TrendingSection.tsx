import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Siren as Fire, Zap } from 'lucide-react';

const TrendingSection = () => {
  const trendingItems = [
    {
      title: 'Netflix Accounts',
      description: 'Premium 4K accounts at 80% discount with warranty',
      image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=600',
      growth: '₹149 Only',
      icon: Fire
    },
    {
      title: 'Spotify Family',
      description: '6 users premium account with offline downloads',
      image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=600',
      growth: '₹99 Only',
      icon: TrendingUp
    },
    {
      title: 'YouTube Premium',
      description: 'Ad-free videos with background play and music',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600',
      growth: '₹89 Only',
      icon: Zap
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
            What's
            <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
              {" "}Trending
            </span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Most popular digital services chosen by thousands of satisfied customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {trendingItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
                {/* Background Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Growth Badge */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{item.growth}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-accent-500 to-primary-500 rounded-lg flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-accent-400 text-sm font-medium">TRENDING NOW</span>
                  </div>
                  
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-accent-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center justify-center space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-white/60 text-sm">Happy Customers</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-white/60 text-sm">Support Available</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <div className="text-3xl font-bold text-white">Instant</div>
                <div className="text-white/60 text-sm">Delivery</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingSection;