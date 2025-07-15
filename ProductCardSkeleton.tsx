// src/components/ProductCardSkeleton.tsx

import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="relative bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 h-auto flex flex-col animate-pulse">
      <div className="h-80 bg-gray-700"></div>
      <div className="p-6 flex-1 flex flex-col">
        <div>
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="h-10 bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="mt-auto pt-4">
            <div className="h-12 bg-gray-700 rounded-lg w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;