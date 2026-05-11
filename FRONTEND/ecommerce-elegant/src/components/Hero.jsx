import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  const scrollToProducts = () => {
    const section = document.getElementById('products');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <span className="hero-badge">New Summer Collection</span>
          <h1>Elegance in <br /> Every Detail.</h1>
          <p>Discover our curated collection of minimalist essentials designed for the modern lifestyle.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={scrollToProducts}>Shop Now</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-wrapper">
             <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000" alt="Hero" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
