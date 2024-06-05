import React from 'react';
import './coupon.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const CouponComponent = ({ onSectionClick, couponData, setCouponData }) => {
  const handleClick = (section) => {
    onSectionClick(section); // Call parent's function with clicked section
  };

  const [localData, setLocalData] = useState({
    // Define initial state object for CouponComponent's specific data
    minimum_spend: '',
    maximum_spend: '',
    individual_use: false,
    exclude_sale: false,
    products: '',
    excludeCategory: '',
    productsCategory: '',
    allowedEmails: '',
  });

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setLocalData({
      ...localData,
      [name]: type === 'checkbox' ? event.target.checked : value,
    });
  };

  const handleSubmit = (section) => {// Call parent's function with clicked section
    setCouponData({ ...couponData, ...localData }); // Update parent's state
  };
  return (
    <div className="coupon-container">
      <h4 className="heading">Coupons</h4>
      <div className="coupon-box">
        <h3 className="coupon-heading">Coupon Data</h3>
        <div className="columns">
          <div className="left-column">
            <div className="row red-text" onClick={() => handleClick('general')}>
              General
            </div>
            <div className="row" onClick={() => handleClick('usageRestriction')}>
              Usage restriction
            </div>
            <div className="row black-text" onClick={() => handleClick('usageLimit')}>
              Usage limit
            </div>
            {[...Array(6)].map((_, index) => (
              <div key={index + 3} className="row hidden-row"></div>
            ))}
          </div>
          <div className="right-column">
            <div className="row"><label>Minimum spend</label><input type="text"
              name="minimum_spend"
              value={localData.minimum_spend}
              onChange={handleChange} /></div>
            <div className="row"><label>Maximum spend</label><input type="text"
              name="maximum_spend"
              value={localData.maximum_spend}
              onChange={handleChange} /></div>
            <div className="row"><label>Individual use only</label><input type="checkbox"
              name="individual_use"
              value={localData.individual_use}
              onChange={handleChange} /></div>
            <div className="row"><label>Exclude sale items</label><input type="checkbox"
              name="exclude_sale"
              value={localData.exclude_sale}
              onChange={handleChange} /></div>
            <div className="row"><label>Products</label><input type="text"
              name="products"
              value={localData.products}
              onChange={handleChange} /></div>
            <div className="row"><label>Exclude category</label><input type="text"
              name="excludeCategory"
              value={localData.excludeCategory}
              onChange={handleChange} /></div>
            <div className="row"><label>Products category</label><input type="text"
              name="productsCategory"
              value={localData.productsCategory}
              onChange={handleChange} /></div>
            <div className="row"><label>Allowed emails</label><input type="text"
              name="allowedEmails"
              value={localData.allowedEmails}
              onChange={handleChange} /></div>
          </div>
        </div>
      </div>
      <button className="save-button" onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default CouponComponent;