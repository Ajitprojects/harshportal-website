// src/services/api.ts (Updated to be more reliable)

import { allProducts } from '../data/products';
import { Product } from '../types';

// This function simulates fetching products by category from a server
export const fetchProductsByCategory = (category: string): Promise<Product[]> => {
  console.log(`Fetching products for category: ${category}...`);
  
  return new Promise((resolve, reject) => {
    // Simulate a network delay of 1 second
    const delay = 1000;

    setTimeout(() => {
      // The random error condition has been removed.
      // The promise will now always resolve successfully.
      
      console.log("Products fetched successfully!");
      const categoryProducts = allProducts.filter(p => p.category === category);
      resolve(categoryProducts);

    }, delay);
  });
};