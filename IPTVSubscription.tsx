// src/pages/IPTVSubscription.tsx
import React from 'react';
import ProductPageLayout from '../components/ProductPageLayout';

const IPTVSubscription = () => {
  const title = (
    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
        <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">PREMIUM</span>
        <span className="block text-white">IPTV SERVICES</span>
    </h1>
  );
  const subCategories = ['All', 'Basic', 'Premium', 'Sports', 'International', 'Family'];

  return (
    <ProductPageLayout
      category="IPTV"
      subCategories={['All', 'Basic', 'Premium', 'Sports', 'International']}
    />
  );
};
export default IPTVSubscription;