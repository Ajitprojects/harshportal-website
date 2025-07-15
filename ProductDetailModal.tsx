// src/components/ProductDetailModal.tsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  features: { title: string; desc: string }[];
  image: string;
  buttonColor: string;
}

interface ModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ModalProps> = ({ product, onClose }) => {
  const { addToCart, isItemInCart } = useCart();

  const calculateDiscount = (price: number, originalPrice: number) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-800 rounded-3xl p-8 max-w-3xl w-full relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <XCircle />
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-auto object-contain rounded-2xl border border-gray-700" />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-white font-black text-4xl mb-3">{product.name}</h2>
                <p className="text-gray-400 mb-4">{product.description}</p>
                <div className="flex items-baseline justify-between mb-4">
                  <p className="text-white text-5xl font-extrabold">₹{product.price}</p>
                  {product.originalPrice > 0 && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {calculateDiscount(product.price, product.originalPrice)}% OFF
                    </span>
                  )}
                </div>
                <h3 className="text-gray-300 font-bold text-xl mb-3 mt-6">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-gray-300">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-400 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-white">{feature.title}</p>
                        <p className="text-sm text-gray-400">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <motion.button
                  onClick={() => addToCart(product.id)}
                  disabled={isItemInCart(product.id)}
                  className={`w-full py-4 rounded-xl font-bold text-white text-lg ${
                    isItemInCart(product.id) ? 'bg-green-500 cursor-not-allowed' : `bg-gradient-to-r ${product.buttonColor}`
                  }`}
                >
                  {isItemInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal;