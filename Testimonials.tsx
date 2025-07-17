import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Arjun Sharma',
      role: 'Content Creator',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Harshportal has been a game-changer for my content creation. Instant delivery and premium quality accounts at unbeatable prices. Highly recommended!',
      verified: true
    },
    {
      name: 'Priya Patel',
      role: 'Digital Marketer',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The IPTV service quality is exceptional. 4K streaming with zero buffering. Customer support is responsive and helpful. Worth every rupee!',
      verified: true
    },
    {
      name: 'Rahul Kumar',
      role: 'Tech Enthusiast',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Been using Harshportal for 6 months now. Never had any issues with account authenticity. Professional service with competitive pricing.',
      verified: true
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
            What Our{" "}
            <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Harshportal for their digital entertainment needs
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <Quote className="w-8 h-8 text-accent-400 mb-4" />

              <p className="text-white/80 text-sm leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-white/60 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats - Responsive Fix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
        <div className="bg-white/5 backdrop-blur-sm rounded-xl px-3 py-4 sm:px-6 sm:py-6 border border-white/10 inline-block overflow-x-auto">
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 min-w-[280px]">
    <div className="text-center">
      <div className="text-xl sm:text-2xl font-bold text-white">4.9/5</div>
      <div className="text-white/60 text-xs sm:text-sm leading-tight">Average Rating</div>
    </div>
    <div className="hidden sm:block w-px h-10 bg-white/20"></div>
    <div className="text-center">
      <div className="text-xl sm:text-2xl font-bold text-white">2,500+</div>
      <div className="text-white/60 text-xs sm:text-sm leading-tight">Reviews</div>
    </div>
    <div className="hidden sm:block w-px h-10 bg-white/20"></div>
    <div className="text-center">
      <div className="text-xl sm:text-2xl font-bold text-white">98%</div>
      <div className="text-white/60 text-xs sm:text-sm leading-tight">Satisfaction</div>
    </div>
  </div>
</div>

        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
