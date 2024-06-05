import React from 'react';
import './couponlimit.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const CouponLimit = ({ onSectionClick, couponData, setCouponData }) => {
  const handleClick = (section) => {
    onSectionClick(section); // Call parent's function with clicked section
  };
  const [localData, setLocalData] = useState({
    // Define initial state object for CouponLimit's specific data
    usage_limit_coupon: '',
    usage_limit_user: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocalData({
      ...localData,
      [name]: value,
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
            <div className="row"><label>Usage Limit Per Coupon</label>
            <input type="text" 
                name="usage_limit_coupon"
                value={localData.usage_limit_coupon}
                onChange={handleChange} />
            </div>
            <div className="row"><label>Usage Limit Per User</label><input type="text"
                name="usage_limit_user"
                value={localData.usage_limit_user}
                onChange={handleChange} /></div>
            <div className="row"><label></label></div>
          </div>
        </div>
      </div>
      <button className="save-button" onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default CouponLimit;