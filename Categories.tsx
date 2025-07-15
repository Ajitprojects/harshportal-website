// src/components/Categories.tsx (Redesigned with Bento Grid)

import React from 'react';
import { motion } from 'framer-motion';
import { Tv, Wifi, Download, Key, Users, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { 
    icon: Tv, 
    name: 'OTT Accounts', 
    description: 'Netflix, Prime & More', 
    className: 'lg:col-span-2', 
    bgColor: 'bg-red-500/10', 
    borderColor: 'border-red-500/30',
    video: 'https://cdn.pixabay.com/video/2022/10/24/134919-766324461_large.mp4',
    href: '/ott-accounts'
  },
  { 
    icon: Wifi, 
    name: 'IPTV Services', 
    description: 'Live TV Channels', 
    className: '', 
    bgColor: 'bg-blue-500/10', 
    borderColor: 'border-blue-500/30',
    href: '/iptv-subscription'
  },
  { 
    icon: Key, 
    name: 'Software Keys', 
    description: 'Windows & Office', 
    className: '', 
    bgColor: 'bg-purple-500/10', 
    borderColor: 'border-purple-500/30',
    href: '/product-keys'
  },
  { 
    icon: Download, 
    name: 'Digital Downloads', 
    description: 'Games & Software', 
    className: 'lg:col-span-3', 
    bgColor: 'bg-green-500/10', 
    borderColor: 'border-green-500/30',
    video: 'https://cdn.pixabay.com/video/2021/09/29/88954-618588612_large.mp4',
    href: '/downloads'
  },
];

const GridItem = ({ item }: { item: typeof categories[0] }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, rotateX: 5, rotateY: -5 }}
      className={`relative rounded-3xl p-8 overflow-hidden group border transition-all duration-300 ${item.className} ${item.bgColor} ${item.borderColor} hover:border-cyan-400/50`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {item.video && (
        <video 
          src={item.video} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-300"
        />
      )}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col h-full">
        <item.icon className="w-10 h-10 text-cyan-400 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
        <p className="text-gray-400 mb-6">{item.description}</p>
        <Link to={item.href} className="mt-auto flex items-center gap-2 font-semibold text-cyan-400 group-hover:text-white transition-colors">
          Explore Now <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

const Categories = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            A Universe of <span className="text-cyan-400">Digital</span> Possibilities
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            From binge-watching your favorite series to unlocking professional software, everything you need is right here.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" style={{ perspective: '1000px' }}>
          {categories.map((category) => (
            <GridItem key={category.name} item={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;