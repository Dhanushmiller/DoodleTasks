import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, User, ShoppingCart, HelpCircle, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { openCart } from '../store/cartSlice';
import '../styles/SideMenu.css';

const SideMenu = ({ isOpen, onClose }) => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const dispatch = useDispatch();

  return (
    <>
      <div className={`side-menu-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <div className={`side-menu ${isOpen ? 'active' : ''}`}>
        <div className="side-menu-header">
          <div className="side-menu-logo">VIBE<span>.</span></div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="side-menu-content">
          <div className="menu-section">
            <h3>Account & Cart</h3>
            <div className="menu-actions">
              <Link to="/signup" className="menu-action-item" onClick={onClose}>
                <div className="action-icon">
                  <User size={20} />
                </div>
                <span>Sign Up / Login</span>
              </Link>

              <Link to="/orders" className="menu-action-item" onClick={onClose}>
                <div className="action-icon">
                  <Package size={20} />
                </div>
                <span>My Orders</span>
              </Link>
              
              <button className="menu-action-item" onClick={() => { dispatch(openCart()); onClose(); }}>
                <div className="action-icon">
                  <ShoppingCart size={20} />
                  {totalQuantity > 0 && <span className="menu-cart-badge">{totalQuantity}</span>}
                </div>
                <span>My Cart</span>
              </button>
            </div>
          </div>

          <div className="menu-section">
            <h3>Support</h3>
            <div className="menu-actions">
              <Link to="/support" className="menu-action-item" onClick={onClose}>
                <div className="action-icon">
                  <HelpCircle size={20} />
                </div>
                <span>Help & Support</span>
              </Link>
            </div>
          </div>

          <div className="menu-section">
            <h3>Navigation</h3>
            <nav className="side-nav-links">
              <Link to="/about" onClick={onClose}>About Us</Link>
            </nav>
          </div>
        </div>

        <div className="side-menu-footer">
          <p>© 2026 VIBE Studio</p>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
