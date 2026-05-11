import React from 'react';
import { 
  Box, 
  RotateCcw, 
  MapPin, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  ShieldCheck,
  Search,
  ChevronRight
} from 'lucide-react';
import '../styles/Support.css';

const Support = () => {
  const supportCards = [
    {
      icon: <Box size={32} />,
      title: "Your Orders",
      desc: "Track packages, edit or cancel orders",
      color: "#e2f2ff"
    },
    {
      icon: <RotateCcw size={32} />,
      title: "Returns and Refunds",
      desc: "Return or exchange items, print return labels",
      color: "#e8f9f1"
    },
    {
      icon: <MapPin size={32} />,
      title: "Manage Addresses",
      desc: "Update your addresses and delivery details",
      color: "#fff1f1"
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Manage Prime",
      desc: "View your benefits and membership details",
      color: "#f5f3ff"
    },
    {
      icon: <CreditCard size={32} />,
      title: "Payment Settings",
      desc: "Add or edit payment methods and settings",
      color: "#fff8eb"
    },
    {
      icon: <Settings size={32} />,
      title: "Account Settings",
      desc: "Change your email, password or preferences",
      color: "#f1f5f9"
    },
    {
      icon: <HelpCircle size={32} />,
      title: "Digital Services",
      desc: "Troubleshoot device issues and app support",
      color: "#fdf2f8"
    }
  ];

  return (
    <div className="support-page">
      <div className="container">
        <div className="support-header">
          <h1>Hello. What can we help you with?</h1>
        </div>

        <div className="support-grid">
          <div className="section-title">Some things you can do here</div>
          <div className="cards-wrapper">
            {supportCards.map((card, index) => (
              <div key={index} className="support-card">
                <div className="card-icon" style={{ backgroundColor: card.color }}>
                  {card.icon}
                </div>
                <div className="card-info">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
                <ChevronRight className="card-arrow" size={18} />
              </div>
            ))}
          </div>
        </div>

        <div className="support-search">
          <div className="search-title">
            <span>Find more solutions</span>
            <p>Type something like, "question about a charge"</p>
          </div>
          <div className="support-search-bar">
            <Search size={20} />
            <input type="text" placeholder="Search our help articles..." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
