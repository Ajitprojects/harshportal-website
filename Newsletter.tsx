import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Gift, Sparkles } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-accent-500/20 to-primary-500/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-400/30 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary-400/30 to-transparent rounded-full blur-2xl" />
          
          <div className="relative z-10 text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl mb-6"
            >
              <Mail className="w-8 h-8 text-white" />
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
            >
              Stay in the Loop
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-white/70 text-lg mb-8 max-w-2xl mx-auto"
            >
              Get notified about new account drops, flash sales, and exclusive discount codes. 
              Plus, get ₹50 off your first purchase when you subscribe!
            </motion.p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 mb-8"
            >
              {[
                { icon: Gift, text: '₹50 Off First Order' },
                { icon: Sparkles, text: 'Exclusive Offers' },
                { icon: Mail, text: 'New Service Alerts' }
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2 text-white/80">
                  <benefit.icon className="w-4 h-4 text-accent-400" />
                  <span className="text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:border-accent-400 transition-colors"
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-accent-500 to-primary-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 whitespace-nowrap"
              >
                Subscribe Now
              </motion.button>
            </motion.form>

            {/* Success Message */}
            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mt-4 text-green-400 font-medium"
              >
                🎉 Welcome to the Harshportal family! Check your email for your discount code.
              </motion.div>
            )}

            {/* Privacy Note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-white/50 text-xs mt-4"
            >
              We respect your privacy. Unsubscribe at any time. Use code "Hportal" for extra savings!
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;