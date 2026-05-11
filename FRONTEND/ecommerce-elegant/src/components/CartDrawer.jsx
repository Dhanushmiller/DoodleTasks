import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { addToCart, removeFromCart, clearItemFromCart, closeCart } from '../store/cartSlice';
import { showToast } from '../store/uiSlice';
import { formatPrice } from '../utils/currencyUtils';
import '../styles/CartDrawer.css';

const CartDrawer = () => {
  const { items, totalAmount, isOpen } = useSelector(state => state.cart);
  const { currencies, selectedCurrency } = useSelector(state => state.ui);
  const currency = currencies[selectedCurrency];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    dispatch(closeCart());
    navigate('/checkout');
  };

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(closeCart());
  };

  return (
    <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={handleClose}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={handleClose}><X size={24} /></button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} />
              <p>Your cart is empty</p>
              <button className="btn-primary" onClick={handleClose}>Start Shopping</button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">{formatPrice(item.price, currency)}</p>
                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => {
                        dispatch(removeFromCart(item.id));
                        dispatch(showToast({ message: 'Removed one item', type: 'info' }));
                      }}><Minus size={16} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => {
                        dispatch(addToCart(item));
                        dispatch(showToast({ message: 'Added another item' }));
                      }}><Plus size={16} /></button>
                    </div>
                    <button className="delete-btn" onClick={() => {
                      dispatch(clearItemFromCart(item.id));
                      dispatch(showToast({ message: 'Item removed from cart', type: 'info' }));
                    }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <span>{formatPrice(totalAmount, currency)}</span>
            </div>
            <p className="shipping-info">Shipping and taxes calculated at checkout.</p>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
