import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, openCart } from '../store/cartSlice';
import { showToast } from '../store/uiSlice';
import { ShoppingBag, ArrowLeft, Star, ShieldCheck, Truck, Send } from 'lucide-react';
import { formatPrice } from '../utils/currencyUtils';
import ProductCard from './ProductCard';
import SEO from './SEO';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.products);
  const { currencies, selectedCurrency } = useSelector(state => state.ui);
  const currency = currencies[selectedCurrency];
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hasReviewed, setHasReviewed] = useState(false);
  
  const product = items.find(item => item.id === parseInt(id));
  
  // Suggestions: Other products from same category or random
  const suggestions = items
    .filter(item => item.id !== parseInt(id))
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  useEffect(() => {
    window.scrollTo(0, 0);
    setUserRating(0);
    setReviewText('');
    setHasReviewed(false);
  }, [id]);

  const handleRating = (rating) => {
    setUserRating(rating);
    dispatch(showToast({ message: `You rated this ${rating} stars!`, type: 'info' }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (userRating === 0) {
      dispatch(showToast({ message: 'Please select a rating first', type: 'error' }));
      return;
    }
    setHasReviewed(true);
    dispatch(showToast({ message: 'Thank you for your review!', type: 'success' }));
  };

  if (!product) return <div className="container">Product not found</div>;

  return (
    <div className="product-details-page">
      <div className="container">
        {product && (
          <SEO 
            title={product.name} 
            description={product.description}
            keywords={`${product.category}, ${product.name}, minimalist`}
          />
        )}
        <Link to="/" className="back-btn">
          <ArrowLeft size={20} /> Back to Shop
        </Link>

        <div className="product-main">
          <div className="product-gallery">
            <div className="main-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          <div className="product-info-detailed">
            <span className="product-category-tag">{product.category}</span>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating">
              <div className="stars interactive">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    fill={i < (userRating || 4) ? "#fbbf24" : "none"} 
                    color="#fbbf24" 
                    onClick={() => handleRating(i + 1)}
                    className="rating-star"
                  />
                ))}
              </div>
              <span>(48 Reviews)</span>
            </div>

            <p className="product-price-large">{formatPrice(product.price, currency)}</p>
            <p className="product-description-detailed">{product.description}</p>

            <div className="product-features">
              <div className="feature">
                <Truck size={20} />
                <span>Free Worldwide Shipping</span>
              </div>
              <div className="feature">
                <ShieldCheck size={20} />
                <span>2 Year Extended Warranty</span>
              </div>
            </div>

            <button className="add-to-cart-large" onClick={() => { 
              dispatch(addToCart(product)); 
              dispatch(showToast({ message: `${product.name} added to bag!` }));
              dispatch(openCart()); 
            }}>
              <ShoppingBag size={20} />
              Add to Bag
            </button>
          </div>
        </div>

        <section className="review-section">
          <h3>Customer Feedback</h3>
          {hasReviewed ? (
            <div className="review-success">
              <div className="success-badge">Verified Review</div>
              <p>Your feedback has been submitted successfully. Thank you for helping the community!</p>
            </div>
          ) : (
            <form className="review-form" onSubmit={handleReviewSubmit}>
              <div className="rating-input">
                <span>Your Rating:</span>
                <div className="stars-input">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={24} 
                      fill={i < userRating ? "#fbbf24" : "none"} 
                      color="#fbbf24" 
                      onClick={() => setUserRating(i + 1)}
                    />
                  ))}
                </div>
              </div>
              <textarea 
                placeholder="Share your experience with this product..." 
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
              <button type="submit" className="btn-secondary">
                <Send size={18} />
                Submit Review
              </button>
            </form>
          )}
        </section>

        <section className="suggestions-section">
          <div className="section-header">
            <h2>You May Also Like</h2>
            <p>Elevate your style with these handpicked selections.</p>
          </div>
          <div className="product-grid">
            {suggestions.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
