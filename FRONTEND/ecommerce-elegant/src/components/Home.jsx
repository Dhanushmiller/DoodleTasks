import React from 'react';
import Hero from './Hero';
import ProductList from './ProductList';
import SEO from './SEO';

const Home = () => {
  return (
    <>
      <SEO 
        title="Home" 
        description="Discover the latest in minimalist fashion. Premium quality, sustainable materials, and elegant designs."
        keywords="minimalist, fashion, e-commerce, sustainable, premium"
      />
      <Hero />
      <ProductList />
    </>
  );
};

export default Home;
