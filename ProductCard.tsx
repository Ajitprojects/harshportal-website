// src/components/ProductCard.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Eye, CheckCircle, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../types';
import toast from 'react-hot-toast'; // Import toast

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart, isItemInCart } = useCart();
  const { toggleWishlist, isItemInWishlist } = useWishlist();

  const isInCart = isItemInCart(product.id);
  const isLiked = isItemInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id);
    toast.success(`${product.name} added to cart!`); // Show success toast
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    // Show different toast based on action
    if (!isLiked) {
      toast.success(`${product.name} added to wishlist!`);
    } else {
      toast('Removed from wishlist.', { icon: '💔' });
    }
  };

  const calculateDiscount = (price: number, originalPrice: number) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer"
      onClick={() => onViewDetails(product)}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-500 h-auto flex flex-col"
      >
        <div className="h-80 relative overflow-hidden">
          <motion.img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-800/50 to-transparent`}></div>
          <div className="absolute top-4 left-4 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            {calculateDiscount(product.price, product.originalPrice)}% OFF
          </div>
          <motion.button 
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm"
            onClick={handleToggleWishlist}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'text-red-500 fill-current' : 'text-white/80'}`} />
          </motion.button>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div>
            <h3 className="text-white font-bold text-xl mb-2 leading-tight uppercase">{product.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 h-12">{product.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag, idx) => (
                <span key={idx} className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full flex items-center">
                  <Tag className="w-3 h-3 mr-1" /> {tag}
                </span>
              ))}
            </div>
            <div className="flex items-baseline mb-4"><p className="text-white text-4xl font-bold">₹{product.price}</p><span className="text-gray-500 text-lg line-through ml-3">₹{product.originalPrice}</span></div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {product.features.slice(0, 4).map((feature, idx) => (
                <div key={idx}><h4 className="text-white font-semibold text-sm">{feature.title}</h4><p className="text-gray-400 text-xs">{feature.desc}</p></div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-auto mb-4">
            <div className="flex items-center space-x-1">{[...Array(5)].map((_, i) => (<Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />))}</div>
            <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm font-semibold"><Eye className="w-4 h-4 mr-1" /><span>View Details</span></button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 text-sm ${isInCart ? 'bg-green-600 cursor-not-allowed' : `bg-gradient-to-r ${product.buttonColor} hover:shadow-lg`}`}
          >
            {isInCart ? <><CheckCircle className="w-5 h-5" /> Added</> : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;