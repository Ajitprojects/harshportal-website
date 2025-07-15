// src/pages/HomePage.tsx

import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import Categories from '../components/Categories';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';
// Note: You might need to create empty files for TrustBadges and TrendingSection if they don't exist
// import TrustBadges from '../components/TrustBadges';
// import TrendingSection from '../components/TrendingSection';

const HomePage = () => {
  return (
    <div>
      <Hero />
      {/* <TrustBadges /> */}
      <Categories />
      <FeaturedProducts />
      {/* <TrendingSection /> */}
      <Testimonials />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default HomePage;