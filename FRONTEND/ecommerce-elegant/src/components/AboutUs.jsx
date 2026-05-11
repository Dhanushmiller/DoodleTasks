import React from 'react';
import { Target, Heart, Zap, Award } from 'lucide-react';
import '../styles/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>We define the <span>VIBE.</span></h1>
          <p>Minimalism isn't just a design choice; it's a lifestyle. We curate essentials that elevate your daily experience through pure form and function.</p>
        </div>
      </section>

      <section className="about-story">
        <div className="container grid-2">
          <div className="story-image">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="Our Studio" />
          </div>
          <div className="story-content">
            <div className="tag">Our Story</div>
            <h2>Born from a passion for clarity.</h2>
            <p>Founded in 2026, VIBE started as a small studio in London with one goal: to remove the noise from everyday objects. We believe that when you simplify your surroundings, you clarify your mind.</p>
            <p>Every product in our collection is hand-picked for its craftsmanship, sustainability, and timeless appeal. We don't follow trends; we create pieces that last a lifetime.</p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <div className="values-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do.</p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <Zap size={32} className="value-icon" />
              <h3>Intentional Design</h3>
              <p>Every curve, material, and function is carefully considered to serve a purpose.</p>
            </div>
            <div className="value-card">
              <Heart size={32} className="value-icon" />
              <h3>Sustainability</h3>
              <p>We partner with eco-conscious creators to minimize our footprint on the planet.</p>
            </div>
            <div className="value-card">
              <Target size={32} className="value-icon" />
              <h3>Quality First</h3>
              <p>We never compromise on materials. If it's not built to last, it's not a VIBE product.</p>
            </div>
            <div className="value-card">
              <Award size={32} className="value-icon" />
              <h3>Customer Care</h3>
              <p>Your experience is our priority. We are here to support your journey every step of the way.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to find your VIBE?</h2>
            <p>Explore our curated collection of minimalist essentials.</p>
            <a href="/" className="btn-primary">Shop Collection</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
