// src/pages/OTTAccounts.tsx
import React from 'react';
import ProductPageLayout from '../components/ProductPageLayout';

const OTTAccounts = () => {
  const title = (
    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
      <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">PREMIUM</span>
      <span className="block text-white">OTT ACCOUNTS</span>
    </h1>
  );
  const subCategories = ['All', 'Streaming', 'Music', 'Sports'];

 return (
    <ProductPageLayout 
      category="OTT"
      subCategories={['All', 'Streaming', 'Music', 'Sports']}
    />
  );
};
export default OTTAccounts;