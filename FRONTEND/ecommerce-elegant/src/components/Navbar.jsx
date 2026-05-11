import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, Heart, Globe } from 'lucide-react';
import { setSearchQuery, setCategory } from '../store/productSlice';
import { toggleWishlistDrawer, setCurrency } from '../store/uiSlice';
import '../styles/Navbar.css';

const Navbar = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchQuery = useSelector(state => state.products.searchQuery);
  const { currencies, selectedCurrency } = useSelector(state => state.ui);
  const wishlistCount = useSelector(state => state.wishlist.items.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCurrencyChange = (e) => {
    dispatch(setCurrency(e.target.value));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleNewArrivals = (e) => {
    e.preventDefault();
    dispatch(setCategory('Shoes'));
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById('products');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCategories = (e) => {
    e.preventDefault();
    dispatch(setCategory('All'));
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById('products');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <div className="logo">
          VIBE<span>.</span>
        </div>
        
        <div className={`search-container ${isSearchOpen ? 'active' : ''}`}>
           <input 
             type="text" 
             placeholder="Search products..." 
             value={searchQuery}
             onChange={handleSearchChange}
             autoFocus={isSearchOpen}
           />
           <button className="icon-btn search-close" onClick={() => {
             setIsSearchOpen(false);
             dispatch(setSearchQuery(''));
           }}>
             <X size={18} />
           </button>
        </div>

        <div className={`nav-links ${isSearchOpen ? 'hidden' : ''}`}>
          <a href="#products" onClick={handleNewArrivals}>New Arrivals</a>
          <a href="#products" onClick={handleCategories}>Categories</a>
        </div>

        <div className="nav-actions">
          {!isSearchOpen && (
            <>
              <button className="icon-btn" onClick={() => setIsSearchOpen(true)}>
                <Search size={20} />
              </button>
              <div className="currency-selector">
                <Globe size={16} />
                <select value={selectedCurrency} onChange={handleCurrencyChange}>
                  {Object.keys(currencies).map(code => (
                    <option key={code} value={code}>{code}</option>
                  ))}
                </select>
              </div>
              <button className="icon-btn wishlist-btn" onClick={() => dispatch(toggleWishlistDrawer())}>
                <Heart size={20} fill={wishlistCount > 0 ? "currentColor" : "none"} />
                {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
              </button>
            </>
          )}
          <button className="icon-btn menu-btn" onClick={onMenuClick}>
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
