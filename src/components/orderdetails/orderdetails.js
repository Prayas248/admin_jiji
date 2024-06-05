import React from 'react';
import './orderdetails.css';

const OrderDetails = () => {
  const summaryItems = [
    { label: 'Items Subtotal:', value: '₹550.00' },
    { label: 'Shipping:', value: '₹78.00' },
    { label: 'Order Total:', value: '₹628.00' },
    { label: 'Paid:', value: '₹628.00', className: 'paid' },
    { label: 'May 17, 2024 via Credit Card/Debit Card/NetBanking', value: '', className: 'date' },
  ];

  return (
    <div className="order-summary">
      <div className="item">
        <div className="item-description">
          <a href="#" className="item-link">
            Timeless Bohemian Chic: Handcrafted Multicolor Hemp Sling Bag
          </a>
          <p className="sku">SKU: JWHASL010</p>
        </div>
        <div className="item-cost">
          <span>₹550.00</span>
          <span>&times; 1</span>
          <span>₹550.00</span>
        </div>
      </div>
      <div className="shipping">
        <p>Delhivery Surface ( Delivery By May 22, 2024)</p>
        <p>₹78.00</p>
      </div>
      <div className="summary">
        {summaryItems.map((item, index) => (
          <div key={index} className={`summary-item ${item.className || ''}`}>
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
      <button className="refund-btn">Refund</button>
      <p className="note">This order is no longer editable.</p>
    </div>
  );
};

export default OrderDetails;
