// src/pages/Downloads.tsx
import React from 'react';
import ProductPageLayout from '../components/ProductPageLayout';

const Downloads = () => {
  const title = (
    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">DOWNLOAD</span>
        <span className="block text-white">CENTER</span>
    </h1>
  );
  const subCategories = ['All', 'Games', 'Software', 'Movies', 'Music', 'Books', 'Design'];

   return (
    <ProductPageLayout
      category="Downloads"
      subCategories={['All', 'Games', 'Software', 'Movies', 'Music']}
    />
  );
};
export default Downloads;