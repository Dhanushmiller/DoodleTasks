import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';
import { addOrderToHistory } from '../store/orderSlice';
import { showToast } from '../store/uiSlice';
import { formatPrice } from '../utils/currencyUtils';
import { CreditCard, Truck, ShieldCheck, ChevronLeft, AlertCircle } from 'lucide-react';
import SEO from './SEO';
import '../styles/Checkout.css';

const Checkout = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const { currencies, selectedCurrency } = useSelector(state => state.ui);
  const currency = currencies[selectedCurrency];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: ''
  });

  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const taxRate = 0.10; // 10% tax
  const taxAmount = totalAmount * taxRate;
  const total = totalAmount + taxAmount;

  useEffect(() => {
    window.scrollTo(0, 0);
    // If cart is empty, maybe redirect back to home
    if (items.length === 0) {
      navigate('/');
    }
  }, [items.length, navigate]);

  const validateField = (name, value) => {
    let error = '';
    if (!value) {
      error = 'This field is required';
    } else {
      if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
        error = 'Invalid email address';
      }
      if (name === 'number' && value.replace(/\s/g, '').length !== 16) {
        error = 'Card number must be 16 digits';
      }
      if (name === 'cvc' && value.length !== 3) {
        error = 'CVC must be 3 digits';
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in shippingDetails) {
      setShippingDetails(prev => ({ ...prev, [name]: value }));
    } else {
      setCardDetails(prev => ({ ...prev, [name]: value }));
    }
    validateField(name, value);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Validate all fields
    const shippingValid = Object.keys(shippingDetails).every(key => validateField(key, shippingDetails[key]));
    const cardValid = paymentMethod === 'creditCard'
      ? Object.keys(cardDetails).every(key => validateField(key, cardDetails[key]))
      : true;

    if (!shippingValid || !cardValid) {
      dispatch(showToast({ message: 'Please fix the errors in the form', type: 'error' }));
      return;
    }

    const orderData = {
      items,
      shippingDetails,
      subtotal: totalAmount,
      tax: taxAmount,
      total,
      currency: selectedCurrency,
      orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`
    };

    // Save to history
    dispatch(addOrderToHistory(orderData));

    // Navigate to confirmation page
    navigate('/order-confirmation', { state: { orderData } });
  };

  if (items.length === 0) return null;

  return (
    <div className="checkout-page">
      <SEO
        title="Checkout"
        description="Secure checkout for your VIBE order. We support major credit cards and digital wallets."
      />
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} /> Back
        </button>

        <div className="checkout-layout">
          <div className="checkout-main">
            <h2>Checkout</h2>

            <form id="checkout-form" onSubmit={handlePlaceOrder}>
              <section className="checkout-section">
                <h3><Truck size={20} /> Shipping Address</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Full Name</label>
                    <input type="text" name="fullName" value={shippingDetails.fullName} onChange={handleInputChange} placeholder="John Doe" />
                    {errors.fullName && <span className="error-msg"><AlertCircle size={14} /> {errors.fullName}</span>}
                  </div>
                  <div className="form-group full-width">
                    <label>Email Address</label>
                    <input type="email" name="email" value={shippingDetails.email} onChange={handleInputChange} placeholder="john@example.com" />
                    {errors.email && <span className="error-msg"><AlertCircle size={14} /> {errors.email}</span>}
                  </div>
                  <div className="form-group full-width">
                    <label>Address</label>
                    <input type="text" name="address" value={shippingDetails.address} onChange={handleInputChange} placeholder="123 Main St, Apt 4B" />
                    {errors.address && <span className="error-msg"><AlertCircle size={14} /> {errors.address}</span>}
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" value={shippingDetails.city} onChange={handleInputChange} placeholder="New York" />
                    {errors.city && <span className="error-msg"><AlertCircle size={14} /> {errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input type="text" name="postalCode" value={shippingDetails.postalCode} onChange={handleInputChange} placeholder="10001" />
                    {errors.postalCode && <span className="error-msg"><AlertCircle size={14} /> {errors.postalCode}</span>}
                  </div>
                  <div className="form-group full-width">
                    <label>Country</label>
                    <input type="text" name="country" value={shippingDetails.country} onChange={handleInputChange} placeholder="United States" />
                    {errors.country && <span className="error-msg"><AlertCircle size={14} /> {errors.country}</span>}
                  </div>
                </div>
              </section>

              <section className="checkout-section">
                <h3><CreditCard size={20} /> Payment Method</h3>
                <div className="payment-options">
                  <label className={`payment-option ${paymentMethod === 'creditCard' ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value="creditCard" checked={paymentMethod === 'creditCard'} onChange={(e) => setPaymentMethod(e.target.value)} />
                    Credit Card
                  </label>
                  <label className={`payment-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={(e) => setPaymentMethod(e.target.value)} />
                    PayPal
                  </label>
                  <label className={`payment-option ${paymentMethod === 'gpay' ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value="gpay" checked={paymentMethod === 'gpay'} onChange={(e) => setPaymentMethod(e.target.value)} />
                    Google Pay
                  </label>
                  <label className={`payment-option ${paymentMethod === 'applepay' ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value="applepay" checked={paymentMethod === 'applepay'} onChange={(e) => setPaymentMethod(e.target.value)} />
                    Apple Pay
                  </label>
                </div>

                {paymentMethod === 'creditCard' && (
                  <div className="form-grid credit-card-details">
                    <div className="form-group full-width">
                      <label>Card Number</label>
                      <input type="text" name="number" value={cardDetails.number} onChange={handleInputChange} placeholder="0000 0000 0000 0000" maxLength="19" />
                      {errors.number && <span className="error-msg"><AlertCircle size={14} /> {errors.number}</span>}
                    </div>
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input type="text" name="expiry" value={cardDetails.expiry} onChange={handleInputChange} placeholder="MM/YY" maxLength="5" />
                      {errors.expiry && <span className="error-msg"><AlertCircle size={14} /> {errors.expiry}</span>}
                    </div>
                    <div className="form-group">
                      <label>CVC</label>
                      <input type="text" name="cvc" value={cardDetails.cvc} onChange={handleInputChange} placeholder="123" maxLength="3" />
                      {errors.cvc && <span className="error-msg"><AlertCircle size={14} /> {errors.cvc}</span>}
                    </div>
                  </div>
                )}

                {paymentMethod === 'gpay' && (
                  <div className="payment-info-box">
                    <p>Google Pay will open in a secure window to complete your purchase.</p>
                  </div>
                )}

                {paymentMethod === 'applepay' && (
                  <div className="payment-info-box">
                    <p>Apple Pay will prompt for biometric authentication on your device.</p>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="payment-info-box">
                    <p>You will be redirected to PayPal to finish your payment safely.</p>
                  </div>
                )}
              </section>
            </form>
          </div>

          <div className="checkout-sidebar">
            <div className="order-summary-box">
              <h3>Order Summary</h3>
              <div className="summary-items">
                {items.map(item => (
                  <div key={item.id} className="summary-item">
                    <div className="summary-item-img">
                      <img src={item.image} alt={item.name} />
                      <span className="summary-item-badge">{item.quantity}</span>
                    </div>
                    <div className="summary-item-info">
                      <h4>{item.name}</h4>
                      <p>{formatPrice(item.price, currency)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalAmount, currency)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span>{formatPrice(taxAmount, currency)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatPrice(total, currency)}</span>
                </div>
              </div>

              <button type="submit" form="checkout-form" className="btn-primary place-order-btn">
                <ShieldCheck size={20} />
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
