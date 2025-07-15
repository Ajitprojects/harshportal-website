// src/pages/CheckoutPage.tsx (with Advanced Validation)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { allProducts } from '../data/products';
import { CreditCard, Truck, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Schema for Shipping Form
const shippingSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  address: z.string().min(10, { message: "Please enter a valid full address." }),
  city: z.string().min(2, { message: "City is required." }),
  pincode: z.string().length(6, { message: "Pincode must be 6 digits." }),
});
type ShippingFormValues = z.infer<typeof shippingSchema>;

// Schema for Payment Form
const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Please enter a valid 16-digit card number." }),
  cardHolder: z.string().min(3, { message: "Cardholder name is required." }),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, { message: "Invalid expiry date format (MM/YY)." }),
  cvv: z.string().regex(/^\d{3}$/, { message: "CVV must be 3 digits." }),
});
type PaymentFormValues = z.infer<typeof paymentSchema>;


const Stepper = ({ currentStep }: { currentStep: number }) => {
    const steps = ['Shipping Details', 'Payment', 'Confirmation'];
    return (
        <div className="flex items-center justify-center mb-12">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className="flex flex-col items-center text-center">
                        <motion.div 
                            animate={{
                                scale: index === currentStep ? 1.1 : 1,
                                backgroundColor: index < currentStep ? '#22c55e' : index === currentStep ? '#06b6d4' : '#374151',
                                borderColor: index <= currentStep ? '#06b6d4' : '#4b5563'
                            }}
                            className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300">
                            {index < currentStep ? <ShieldCheck className="w-6 h-6 text-white"/> : <span className="text-white font-bold text-lg">{index + 1}</span>}
                        </motion.div>
                        <p className={`mt-2 text-xs font-semibold transition-colors w-20 ${index <= currentStep ? 'text-white' : 'text-gray-500'}`}>{step}</p>
                    </div>
                    {index < steps.length - 1 && <div className={`flex-1 h-1 mx-2 transition-colors ${index < currentStep ? 'bg-green-500' : 'bg-gray-700'}`}></div>}
                </React.Fragment>
            ))}
        </div>
    );
};

const CheckoutPage = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const shippingForm = useForm<ShippingFormValues>({ resolver: zodResolver(shippingSchema) });
  const paymentForm = useForm<PaymentFormValues>({ resolver: zodResolver(paymentSchema) });

  const cartProducts = allProducts.filter(product => cartItems.some(item => item.id === product.id)).map(product => ({...product, quantity: cartItems.find(item => item.id === product.id)?.quantity || 0 }));
  const subtotal = cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const handleShippingSubmit = (data: ShippingFormValues) => {
    console.log("Shipping Info:", data);
    setStepIndex(1);
  };

  const handlePaymentSubmit = (data: PaymentFormValues) => {
    console.log("Payment Info:", data);
    console.log("Order Placed!");
    clearCart();
    navigate('/order-confirmation');
  };

  const formVariants = { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 } };
  const inputClass = (hasError: boolean) => `w-full bg-gray-700/50 p-3 rounded-lg text-white border-2 transition-colors ${hasError ? 'border-red-500' : 'border-transparent focus:border-cyan-500'} focus:outline-none`;
  const errorTextClass = "text-red-400 text-xs mt-1 px-1";

  return (
    <div className="min-h-screen bg-gray-900 pt-28 pb-16 bg-cyber-grid bg-[length:50px_50px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
          <Stepper currentStep={stepIndex} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-primary-700 overflow-hidden">
                <AnimatePresence mode="wait">
                    {stepIndex === 0 && (
                        <motion.form key="shipping" variants={formVariants} initial="initial" animate="animate" exit="exit" onSubmit={shippingForm.handleSubmit(handleShippingSubmit)}>
                            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2"><Truck /> Shipping Details</h2>
                            <div className="space-y-4">
                                <div><input {...shippingForm.register("fullName")} className={inputClass(!!shippingForm.formState.errors.fullName)} placeholder="Full Name" />{shippingForm.formState.errors.fullName && <p className={errorTextClass}>{shippingForm.formState.errors.fullName.message}</p>}</div>
                                <div><input {...shippingForm.register("address")} className={inputClass(!!shippingForm.formState.errors.address)} placeholder="Address" />{shippingForm.formState.errors.address && <p className={errorTextClass}>{shippingForm.formState.errors.address.message}</p>}</div>
                                <div className="flex gap-4">
                                    <div className="w-1/2"><input {...shippingForm.register("city")} className={inputClass(!!shippingForm.formState.errors.city)} placeholder="City" />{shippingForm.formState.errors.city && <p className={errorTextClass}>{shippingForm.formState.errors.city.message}</p>}</div>
                                    <div className="w-1/2"><input {...shippingForm.register("pincode")} className={inputClass(!!shippingForm.formState.errors.pincode)} placeholder="Pincode" />{shippingForm.formState.errors.pincode && <p className={errorTextClass}>{shippingForm.formState.errors.pincode.message}</p>}</div>
                                </div>
                            </div>
                            <button type="submit" className="w-full mt-6 bg-cyan-500 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2">Continue <ArrowRight size={18}/></button>
                        </motion.form>
                    )}
                    {stepIndex === 1 && (
                         <motion.form key="payment" variants={formVariants} initial="initial" animate="animate" exit="exit" onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)}>
                            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2"><CreditCard /> Payment Details</h2>
                            <div className="space-y-4">
                                <div><input {...paymentForm.register("cardNumber")} className={inputClass(!!paymentForm.formState.errors.cardNumber)} placeholder="Card Number" />{paymentForm.formState.errors.cardNumber && <p className={errorTextClass}>{paymentForm.formState.errors.cardNumber.message}</p>}</div>
                                <div><input {...paymentForm.register("cardHolder")} className={inputClass(!!paymentForm.formState.errors.cardHolder)} placeholder="Cardholder Name" />{paymentForm.formState.errors.cardHolder && <p className={errorTextClass}>{paymentForm.formState.errors.cardHolder.message}</p>}</div>
                                <div className="flex gap-4">
                                    <div className="w-1/2"><input {...paymentForm.register("expiry")} className={inputClass(!!paymentForm.formState.errors.expiry)} placeholder="MM/YY" />{paymentForm.formState.errors.expiry && <p className={errorTextClass}>{paymentForm.formState.errors.expiry.message}</p>}</div>
                                    <div className="w-1/2"><input {...paymentForm.register("cvv")} className={inputClass(!!paymentForm.formState.errors.cvv)} placeholder="CVV" />{paymentForm.formState.errors.cvv && <p className={errorTextClass}>{paymentForm.formState.errors.cvv.message}</p>}</div>
                                </div>
                            </div>
                            <button type="submit" disabled={paymentForm.formState.isSubmitting} className="w-full mt-6 bg-green-500 text-white p-3 rounded-lg font-semibold disabled:opacity-50">Place Order (₹{total.toFixed(2)})</button>
                            <button type="button" onClick={() => setStepIndex(0)} className="w-full mt-2 text-gray-400 text-sm hover:text-white">Back to Shipping</button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-primary-700 h-fit">
              <h2 className="text-2xl font-semibold text-white mb-4">Your Order</h2>
              <div className="max-h-60 overflow-y-auto space-y-2 pr-2">{cartProducts.map(p => <div key={p.id} className="flex justify-between items-center text-sm py-1"><div className="flex items-center gap-2"><img src={p.image} className="w-10 h-10 rounded-md object-cover"/><span className="text-gray-300">{p.name} (x{p.quantity})</span></div><span className="text-white">₹{(p.price * p.quantity).toFixed(2)}</span></div>)}</div>
              <div className="border-t border-gray-700 my-4"></div>
              <div className="space-y-2"><div className="flex justify-between text-gray-400 text-sm"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div><div className="flex justify-between text-gray-400 text-sm"><span>Shipping</span><span>₹{shipping.toFixed(2)}</span></div></div>
              <div className="border-t border-gray-700 my-4"></div>
              <div className="flex justify-between font-bold text-white text-lg"><p>Total Amount</p><p>₹{total.toFixed(2)}</p></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;