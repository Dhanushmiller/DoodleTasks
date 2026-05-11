import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Package, Truck } from 'lucide-react';
import { formatPrice } from '../utils/currencyUtils';
import SEO from './SEO';
import '../styles/OrderHistory.css';

const OrderHistory = () => {
  const { history } = useSelector(state => state.orders);
  const { currencies } = useSelector(state => state.ui);
  const navigate = useNavigate();

  return (
    <div className="order-history-page">
      <SEO 
        title="My Orders" 
        description="View and track your past VIBE orders."
      />
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ChevronLeft size={20} /> Back to Shop
        </button>

        <div className="history-header">
          <h1>My Orders</h1>
          <p>View and track your past purchases</p>
        </div>

        <div className="orders-list">
          {history.length === 0 ? (
            <div className="empty-history">
              <Package size={64} strokeWidth={1} />
              <h3>No orders yet</h3>
              <p>When you buy something, it will appear here.</p>
              <Link to="/" className="btn-primary">Start Shopping</Link>
            </div>
          ) : (
            history.map(order => (
              <div key={order.orderNumber} className="order-card">
                <div className="order-card-header">
                  <div className="order-meta">
                    <div className="meta-item">
                      <span className="label">Order Number</span>
                      <span className="value">{order.orderNumber}</span>
                    </div>
                    <div className="meta-item">
                      <span className="label">Date</span>
                      <span className="value">{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="meta-item">
                      <span className="label">Total</span>
                      <span className="value">{formatPrice(order.total, currencies[order.currency])}</span>
                    </div>
                  </div>
                  <div className="order-status badge-processing">{order.status}</div>
                </div>

                <div className="order-items-preview">
                  {order.items.map(item => (
                    <div key={item.id} className="preview-item">
                      <img src={item.image} alt={item.name} />
                      <div className="preview-info">
                        <h4>{item.name}</h4>
                        <p>Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-card-footer">
                  <div className="shipping-preview">
                    <Truck size={16} />
                    <span>Shipping to {order.shippingDetails?.city || 'N/A'}, {order.shippingDetails?.country || 'N/A'}</span>
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

export default OrderHistory;
