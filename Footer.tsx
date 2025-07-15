// src/components/Footer.tsx (Corrected)

import React from 'react';
import { motion } from 'framer-motion';
// Heart icon is now included in the import
import { Instagram, Twitter, Youtube, Mail, Phone, Heart } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const footerLinks = {
    Services: ['OTT Accounts', 'IPTV Services', 'Downloads', 'Key Activation'],
    Support: ['Contact Us', 'How It Works', 'Refund Policy', 'FAQ'],
    Company: ['About Us', 'Why Choose Us', 'Testimonials', 'Security'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy']
  };

  return (
    <footer className="relative bg-black bg-cyber-grid bg-[length:40px_40px] border-t border-cyan-500/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      <div className="absolute -top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-2xl font-display">H</span>
                </div>
                <span className="text-white font-display font-bold text-2xl">HARSHPORTAL</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                India's most trusted source for premium digital services and accounts, with instant delivery and 24/7 support.
              </p>
              <div className="flex space-x-3 pt-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2, color: '#00ffff' }}
                    className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-400 border border-gray-700/50 hover:border-cyan-500/50 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-white font-semibold uppercase tracking-wider">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="relative text-gray-400 hover:text-white text-sm transition-colors duration-200 group">
                      <span>{link}</span>
                      <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-t-2 border-transparent bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-8" />
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Harshportal. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for the community.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;