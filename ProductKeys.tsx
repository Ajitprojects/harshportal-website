// src/pages/ProductKeys.tsx
import React from 'react';
import ProductPageLayout from '../components/ProductPageLayout';

const ProductKeys = () => {
  const title = (
    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
        <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">SOFTWARE</span>
        <span className="block text-white">LICENSE KEYS</span>
    </h1>
  );
  const subCategories = ['All', 'OS', 'Office', 'Creative', 'Security', 'Development'];
  
return (
    <ProductPageLayout
      category="Keys"
      subCategories={['All', 'OS', 'Office', 'Creative', 'Security']}
    />
  );
};
export default ProductKeys;