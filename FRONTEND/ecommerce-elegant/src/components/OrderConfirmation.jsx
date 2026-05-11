import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { formatPrice } from '../utils/currencyUtils';
import { CheckCircle, Package, Truck, ArrowRight, Home } from 'lucide-react';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currencies } = useSelector(state => state.ui);
  const orderData = location.state?.orderData;
  const currency = orderData ? currencies[orderData.currency] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    // If no order data, redirect to home
    if (!orderData) {
      navigate('/');
    } else {
      // Clear cart upon successful navigation to confirmation
      dispatch(clearCart());
    }
  }, [orderData, navigate, dispatch]);

  if (!orderData) return null;

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-content">
          <div className="success-header">
            <CheckCircle size={64} className="success-icon" />
            <h1>Order Confirmed!</h1>
            <p>Thank you for your purchase. Your order has been successfully placed.</p>
            <div className="order-number">
              Order #{orderData.orderNumber}
            </div>
          </div>

          <div className="confirmation-grid">
            <div className="confirmation-details">
              <div className="detail-section">
                <h3><Package size={20} /> Items Ordered</h3>
                <div className="ordered-items">
                  {orderData.items.map(item => (
                    <div key={item.id} className="ordered-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <div className="item-price">
                        {formatPrice(item.totalPrice, currency)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h3><Truck size={20} /> Shipping Details</h3>
                <div className="shipping-address-card">
                  <p><strong>{orderData.shippingDetails.fullName}</strong></p>
                  <p>{orderData.shippingDetails.address}</p>
                  <p>{orderData.shippingDetails.city}, {orderData.shippingDetails.postalCode}</p>
                  <p>{orderData.shippingDetails.country}</p>
                </div>
              </div>
            </div>

            <div className="confirmation-sidebar">
              <div className="receipt-card">
                <h3>Payment Receipt</h3>
                <div className="receipt-lines">
                  <div className="receipt-line">
                    <span>Subtotal</span>
                    <span>{formatPrice(orderData.subtotal, currency)}</span>
                  </div>
                  <div className="receipt-line">
                    <span>Tax (10%)</span>
                    <span>{formatPrice(orderData.tax, currency)}</span>
                  </div>
                  <div className="receipt-line">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="receipt-line total">
                    <span>Total Paid</span>
                    <span>{formatPrice(orderData.total, currency)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/" className="btn-primary continue-shopping-btn">
              <Home size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
