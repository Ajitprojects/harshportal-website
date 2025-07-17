import React from 'react';
import ProductPageLayout from '../components/ProductPageLayout';

const OTTAccounts = () => {
  return (
    <ProductPageLayout 
      category="OTT Accounts" // This tells the layout what to query from Supabase
      subCategories={['All', 'Streaming', 'Music', 'Sports']}
    />
  );
};

export default OTTAccounts;