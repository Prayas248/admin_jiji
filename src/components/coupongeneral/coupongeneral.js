import React from 'react';
import './coupongeneral.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const CouponGeneral = ({ onSectionClick, couponData, setCouponData }) => {
  const handleClick = (section) => {
    onSectionClick(section); // Call parent's function with clicked section
  };
  const [localData, setLocalData] = useState({
    // Define initial state object for CouponGeneral's specific data
    discount_type: '',
    coupon_amount: '',
    free_shipping: false,
    expiry_date: '',
  });

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setLocalData({
      ...localData,
      [name]: type === 'checkbox' ? event.target.checked : value,
    });
  };

  const handleSubmit = (event) => { 
    event.preventDefault();// Call parent's function with clicked section
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
            <div className="row"><label>Discount type</label>
            <select className="sel" name="discount_type" value={localData.discount_type} onChange={handleChange}>
                <option>fixed cart discount</option>
                <option>pencentage discount</option>
                <option>fixed product discount</option>
            </select>
            </div>
            <div className="row"><label>Coupon Amount</label><input type="text" name="coupon_amount" value={localData.coupon_amount} onChange={handleChange} /></div>
            <div className="row"><label>Allow free shipping</label><input type="checkbox" name="free_shipping" value={localData.free_shipping} onChange={handleChange}/></div>
            <div className="row"><label>Experiy date</label><input type="date" name="expiry_date" value={localData.expiry_date} onChange={handleChange} /></div>
          </div>
        </div>
      </div>
      <button className="save-button" onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default CouponGeneral;