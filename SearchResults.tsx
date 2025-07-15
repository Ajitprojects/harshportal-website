// src/pages/SearchResults.tsx

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, XCircle, CheckCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { allProducts } from '../data/products';
import { useCart } from '../context/CartContext';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const { addToCart, isItemInCart } = useCart();

    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const closeModal = () => setSelectedProduct(null);

    const searchResults = useMemo(() => {
        if (!query) return [];
        return allProducts.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
    }, [query]);

    const calculateDiscount = (price: number, originalPrice: number) => { if (!originalPrice || originalPrice <= price) return 0; return Math.round(((originalPrice - price) / originalPrice) * 100); };

    return (
        <div className="min-h-screen bg-gray-900 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Search Results for: <span className="text-cyan-400">"{query}"</span></h1>
                    <p className="text-lg text-gray-400">{searchResults.length} product(s) found</p>
                </motion.div>
                
                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>{searchResults.map((p) => <ProductCard key={p.id} product={p} onViewDetails={setSelectedProduct} />)}</AnimatePresence>
                    </div>
                ) : (
                    <div className="text-center py-20"><Search className="w-16 h-16 mx-auto text-gray-600 mb-4" /><h2 className="text-2xl font-bold text-white">No Products Found</h2><p className="text-gray-400 mt-2">Try searching for something else.</p></div>
                )}
            </div>
            
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal}>
                        <motion.div className="bg-gray-800 rounded-3xl p-8 max-w-3xl w-full relative" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
                            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-white"><XCircle /></button>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="md:w-1/3 flex-shrink-0"><img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-auto object-contain rounded-2xl border border-gray-700" /></div>
                                <div className="md:w-2/3">
                                    <h2 className="text-white font-black text-4xl mb-3">{selectedProduct.name}</h2>
                                    <p className="text-gray-400 mb-4">{selectedProduct.description}</p>
                                    <div className="flex items-baseline justify-between mb-4"><p className="text-white text-5xl font-extrabold">₹{selectedProduct.price}</p>{selectedProduct.originalPrice > 0 && <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">{calculateDiscount(selectedProduct.price, selectedProduct.originalPrice)}% OFF</span>}</div>
                                    <h3 className="text-gray-300 font-bold text-xl mb-3 mt-6">Key Features</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">{selectedProduct.features.map((feature: { title: string; desc: string }, idx: number) => (<div key={idx} className="flex items-start text-gray-300"><CheckCircle className="w-5 h-5 mr-2 text-green-400 flex-shrink-0" /><div><p className="font-semibold text-white">{feature.title}</p><p className="text-sm text-gray-400">{feature.desc}</p></div></div>))}</div>
                                    <motion.button onClick={() => addToCart(selectedProduct.id)} disabled={isItemInCart(selectedProduct.id)} className={`w-full py-4 rounded-xl font-bold text-white text-lg ${isItemInCart(selectedProduct.id) ? 'bg-green-500' : `bg-gradient-to-r ${selectedProduct.buttonColor}`}`}>{isItemInCart(selectedProduct.id) ? 'Added to Cart' : 'Add to Cart'}</motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchResults;