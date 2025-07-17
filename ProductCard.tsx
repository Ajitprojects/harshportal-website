// src/components/ProductCard.tsx (Updated with wishlist actions conditional + wow buttons)

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ShoppingCart, Heart, Eye, CheckCircle, Trash } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../types';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  showWishlistActions?: boolean; // new optional prop
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, showWishlistActions = false }) => {
  const { addToCart, isItemInCart } = useCart();
  const { toggleWishlist, isItemInWishlist } = useWishlist();

  const isInCart = isItemInCart(product.id);
  const isLiked = isItemInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    if (!isLiked) toast.success(`${product.name} added to wishlist!`);
    else toast('Removed from wishlist.', { icon: '💔' });
  };

  const handleMoveToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInCart) {
      addToCart(product.id);
      toggleWishlist(product.id);
      toast.success(`${product.name} moved to cart!`);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    toast('Removed from wishlist.', { icon: '🗑️' });
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: 'easeOut' }
        }
      }}
      whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0,255,255,0.1)' }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onViewDetails(product)}
      className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black p-[2px] rounded-3xl group cursor-pointer transition-all duration-500 shadow-lg shadow-cyan-500/10 hover:shadow-purple-500/20"
    >
      <div className="bg-black/60 backdrop-blur-md rounded-[22px] p-4 flex flex-col items-center text-center h-full w-full transition duration-300 ease-in-out relative overflow-hidden">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <span className="absolute top-2 left-2 text-[10px] font-bold bg-green-500 text-white px-2 py-0.5 rounded-full">
            {discount}% OFF
          </span>
          <button
            onClick={handleToggleWishlist}
            className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white hover:text-red-500 backdrop-blur-md"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-white/70'}`} />
          </button>
        </div>

        <h3 className="text-white text-base font-bold uppercase truncate mb-1">{product.name}</h3>

        <div className="flex justify-center items-center gap-2 mb-2">
          <p className="text-xl font-bold text-cyan-400">₹{product.price}</p>
          <span className="line-through text-sm text-gray-500">₹{product.originalPrice}</span>
        </div>

        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
          ))}
        </div>

        <button
          className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 mb-3"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(product);
          }}
        >
          <Eye className="w-4 h-4" /> View
        </button>

        {showWishlistActions ? (
          <div className="flex gap-2 w-full">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMoveToCart}
              disabled={isInCart}
              className={`flex items-center justify-center gap-2 text-sm font-bold px-4 py-2 rounded-md transition-all w-full ${
                isInCart ? 'bg-green-600 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500'
              }`}
            >
              <ShoppingCart className="w-4 h-4" /> {isInCart ? 'Added' : 'Move to Cart'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRemove}
              className="flex items-center justify-center gap-2 text-sm font-bold px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md w-full"
            >
              <Trash className="w-4 h-4" /> Remove
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`w-full py-2 mt-auto rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
              isInCart
                ? 'bg-green-600 cursor-not-allowed'
                : `bg-gradient-to-r ${product.buttonColor} hover:shadow-lg hover:shadow-${product.buttonColor?.split('to-')[1]}/40`
            }`}
          >
            {isInCart ? (
              <>
                <CheckCircle className="w-4 h-4" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" /> Add
              </>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
