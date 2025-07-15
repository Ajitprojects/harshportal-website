// src/components/FeaturedProducts.tsx (Corrected)

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { fetchProductsByCategory } from '../services/api'; // Correctly use fetchProductsByCategory
import { Product } from '../types';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Fetch products from the "OTT" category as featured products
        const data = await fetchProductsByCategory("OTT");
        // We will show only the first 4 as featured
        setProducts(data.slice(0, 4));
      } catch (err: any) {
        setError("Failed to load featured products.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white">Featured Products</h2>
          <p className="text-gray-400 mt-2">Hand-picked selection of our best-selling digital goods.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : error ? (
            <div className="lg:col-span-4 text-center text-red-500">{error}</div>
          ) : (
            products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={setSelectedProduct} 
              />
            ))
          )}
        </div>
      </div>
      {/* You can add the ProductDetailModal here if you want it to open from this section */}
    </section>
  );
};

export default FeaturedProducts;