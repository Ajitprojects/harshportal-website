import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface ModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ModalProps> = ({ product, onClose }) => {
  const { addToCart, isItemInCart } = useCart();

  const calculateDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-gradient-to-br from-gray-800/90 via-gray-900/80 to-black border border-cyan-400/20 shadow-lg backdrop-blur-xl rounded-3xl p-6 md:p-10 max-w-4xl w-full overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <button onClick={onClose} className="absolute top-5 right-5 text-white hover:text-red-400 transition-colors">
              <XCircle className="w-6 h-6" />
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-2xl border border-cyan-400/20" />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-white font-black text-3xl md:text-4xl mb-2 uppercase">{product.name}</h2>
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white text-3xl md:text-4xl font-extrabold">₹{product.price}</p>
                  {product.originalPrice && product.originalPrice > 0 && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {calculateDiscount(product.price, product.originalPrice)}% OFF
                    </span>
                  )}
                </div>
                <h3 className="text-gray-300 font-bold text-lg mb-2 mt-4">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* FIX: Use optional chaining to prevent crash if features array is missing */}
                  {product.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-gray-300 gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                      <div>
                        <p className="font-semibold text-white text-sm">{feature.title}</p>
                        <p className="text-xs text-gray-400">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <motion.button
                  onClick={() => addToCart(product.id)}
                  disabled={isItemInCart(product.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 ${
                    isItemInCart(product.id)
                      ? 'bg-green-600 cursor-not-allowed'
                      : `bg-gradient-to-r ${product.buttonColor || 'from-cyan-500 to-purple-600'} hover:shadow-lg`
                  }`}
                >
                  {isItemInCart(product.id) ? '✓ Added to Cart' : 'Add to Cart'}
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