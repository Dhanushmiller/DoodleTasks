import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { toggleWishlistDrawer } from '../store/uiSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import { showToast } from '../store/uiSlice';
import { formatPrice } from '../utils/currencyUtils';
import '../styles/WishlistDrawer.css';

const WishlistDrawer = () => {
  const isWishlistOpen = useSelector(state => state.ui.isWishlistOpen || false);
  const { items } = useSelector(state => state.wishlist);
  const { currencies, selectedCurrency } = useSelector(state => state.ui);
  const currency = currencies[selectedCurrency];
  const dispatch = useDispatch();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(toggleWishlist(product));
    dispatch(showToast({ message: 'Moved to cart!' }));
  };

  return (
    <div className={`wishlist-overlay ${isWishlistOpen ? 'open' : ''}`} onClick={() => dispatch(toggleWishlistDrawer())}>
      <div className="wishlist-drawer" onClick={e => e.stopPropagation()}>
        <div className="wishlist-header">
          <div className="wishlist-title">
            <Heart size={20} fill="currentColor" />
            <h2>Your Wishlist</h2>
          </div>
          <button className="close-btn" onClick={() => dispatch(toggleWishlistDrawer())}>
            <X size={24} />
          </button>
        </div>

        <div className="wishlist-items">
          {items.length === 0 ? (
            <div className="empty-wishlist">
              <Heart size={48} strokeWidth={1} />
              <p>Your wishlist is empty</p>
              <button className="btn-primary" onClick={() => dispatch(toggleWishlistDrawer())}>
                Explore Products
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="wishlist-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">{formatPrice(item.price, currency)}</p>
                  <div className="item-actions">
                    <button className="move-to-cart" onClick={() => handleMoveToCart(item)}>
                      <ShoppingBag size={18} />
                      Add to Cart
                    </button>
                    <button className="delete-btn" onClick={() => dispatch(toggleWishlist(item))}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;
