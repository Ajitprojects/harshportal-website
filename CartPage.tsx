// src/pages/CartPage.tsx (Updated with Coupon Logic)

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { allProducts } from '../data/products';
import { ShoppingCart, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { cartItems, removeFromCart, addToCart, decreaseQuantity } = useCart();

  const [couponCode, setCouponCode] = React.useState('');
  const [discountPercent, setDiscountPercent] = React.useState(0);
  const [couponError, setCouponError] = React.useState('');



const handleApplyCoupon = () => {
  const trimmed = couponCode.trim().toUpperCase();

  if ((trimmed === 'CYBER2024' && discountPercent === 20) || 
      (trimmed === 'MEGA90' && discountPercent === 90)) {
    toast.error(`Coupon "${trimmed}" already applied ✅`);
    return;
  }

  if (trimmed === 'CYBER2024') {
    setDiscountPercent(20);
    toast.success('Coupon "CYBER2024" applied! 🎉');
  } else if (trimmed === 'MEGA90') {
    setDiscountPercent(90);
    toast.success('Coupon "MEGA90" applied! 🤑');
  } else {
    setDiscountPercent(0);
    toast.error('Invalid coupon code ❌');
  }
};


  const cartProducts = cartItems.map(item => {
    const productDetail = allProducts.find(p => p.id === item.id);
    return { ...productDetail!, quantity: item.quantity };
  }).sort((a, b) => a.id - b.id);

  const subtotal = cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal - discountAmount + shipping;

  return (
    <div className="min-h-screen bg-gray-900 pt-28 pb-16 bg-cyber-grid bg-[length:50px_50px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl font-black text-white">Shopping Bag</h1>
          <p className="text-lg text-gray-400">You have {cartItems.length} unique items in your bag.</p>
        </motion.div>

        {cartProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-primary-700 space-y-2">
              <AnimatePresence>
                {cartProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex flex-col sm:flex-row items-center justify-between p-4 bg-primary-900/50 rounded-lg border border-gray-700/50"
                  >
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0 flex-grow">
                      <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg border-2 border-primary-700" />
                      <div>
                        <p className="font-semibold text-white text-lg">{product.name}</p>
                        <p className="text-sm text-gray-400">Unit Price: ₹{product.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 sm:gap-8">
                      <div className="flex items-center justify-center gap-3 bg-gray-700/50 border border-gray-600 rounded-lg p-2">
                        <button onClick={() => decreaseQuantity(product.id)} className="p-1 rounded-md text-gray-300 hover:bg-gray-600 hover:text-white"><Minus size={16} /></button>
                        <span className="font-bold text-lg w-8 text-center">{product.quantity}</span>
                        <button onClick={() => addToCart(product.id)} className="p-1 rounded-md text-gray-300 hover:bg-gray-600 hover:text-white"><Plus size={16} /></button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-lg text-white">₹{(product.price * product.quantity).toFixed(2)}</p>
                        <button onClick={() => removeFromCart(product.id)} className="text-red-500 hover:text-red-400 text-xs mt-1 flex items-center gap-1 ml-auto">
                          <Trash2 size={14}/> Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-primary-700 h-fit">
                <h2 className="text-2xl font-bold text-white mb-4">Coupon Code</h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-gray-700/50 p-3 rounded-lg text-white border-2 border-transparent focus:border-cyan-500 focus:outline-none"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-gray-600 text-white px-4 rounded-lg font-semibold hover:bg-gray-500"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-red-400 text-sm mt-2">{couponError}</p>}
                {discountPercent > 0 && !couponError && (
                  <p className="text-green-400 text-sm mt-2">✅ {discountPercent}% off applied!</p>
                )}
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-primary-700 h-fit sticky top-28">
                <h2 className="text-2xl font-bold text-white mb-6">Cart Total</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-green-400 font-semibold">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-300"><span>Shipping</span><span>₹{shipping.toFixed(2)}</span></div>
                  <div className="border-t border-gray-700 my-4"></div>
                  <div className="flex justify-between text-2xl font-bold text-white"><span>Total Amount</span><span>₹{total.toFixed(2)}</span></div>
                  <Link to="/checkout">
                    <motion.button whileHover={{ scale: 1.02, y: -2, boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)" }} className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2">
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-5 h-5"/>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-800/50 rounded-2xl">
            <ShoppingCart className="w-20 h-20 mx-auto text-gray-600 mb-4" />
            <h2 className="text-3xl font-bold text-white">Your Shopping Bag is Empty</h2>
            <p className="text-gray-400 mt-2 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/"><motion.button whileHover={{scale: 1.05}} className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold">Continue Shopping</motion.button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
