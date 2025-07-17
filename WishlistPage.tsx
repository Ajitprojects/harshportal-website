// src/pages/WishlistPage.tsx

import React, { useState } from 'react';
import { allProducts } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import { Product } from '../types';

const WishlistPage: React.FC = () => {
  const { wishlistItemIds, clearWishlist } = useWishlist();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const wishlistProducts: Product[] = allProducts.filter((product) =>
    wishlistItemIds.has(product.id)
  );

  return (
    <div className="pt-28 px-4 max-w-7xl mx-auto min-h-screen text-white">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
        <h1 className="text-3xl font-bold">
          My Wishlist {wishlistProducts.length > 0 && `(${wishlistProducts.length})`}
        </h1>
        {wishlistProducts.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-sm text-red-400 hover:text-red-300 border border-red-400 hover:border-red-300 px-4 py-1 rounded transition-all"
          >
            Clear All
          </button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <p className="text-gray-400 text-lg sm:text-xl">
            You haven’t added anything to your wishlist yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={() => setSelectedProduct(product)}
              showWishlistActions={true}
            />
          ))}
        </div>
      )}

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default WishlistPage;
