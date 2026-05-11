import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import Toast from './components/Toast';
import LoginModal from './components/LoginModal';
import SideMenu from './components/SideMenu';
import SignUp from './components/SignUp';
import Support from './components/Support';
import AboutUs from './components/AboutUs';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import OrderHistory from './components/OrderHistory';
import './styles/App.css';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleLogin = () => setIsLoginOpen(!isLoginOpen);
  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);

  return (
    <HelmetProvider>
      <Router>
        <div className="app">
        <Navbar onMenuClick={toggleSideMenu} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Routes>
        </main>
        <SideMenu 
          isOpen={isSideMenuOpen} 
          onClose={toggleSideMenu} 
          onLoginClick={toggleLogin} 
        />
        <CartDrawer />
        <WishlistDrawer />
        <Toast />
        <LoginModal isOpen={isLoginOpen} onClose={toggleLogin} />
        
        <footer className="footer">
          <div className="container footer-content">
            <div className="footer-logo">VIBE<span>.</span></div>
            <p>© 2026 VIBE Minimalist E-commerce. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  </HelmetProvider>
);
}

export default App;
