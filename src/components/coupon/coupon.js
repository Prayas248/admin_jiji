import React from 'react';
import './coupon.css';

const Coupons = () => {
  return (
    <div className="coupons">
      <h1>Coupons</h1>
      <div className="coupon-data">
        <h2>Coupon Data</h2>
        <table>
          <thead>
            <tr>
              <th>General</th>
              <th>Discount Type</th>
              <th>Usage Restriction</th>
              <th>Coupon Amount</th>
              <th>Usage Limit</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>-</td>
              <td>Fixed Cart Discount</td>
              <td>-</td>
              <td>$1111</td>
              <td>-</td>
              <td>05-05-2024</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="discount-type">
        <h2>Discount Type</h2>
        <ul>
          <li>Fixed Cart Discount</li>
          <li>Percentage Discount</li>
          <li>Fixed Product Discount</li>
        </ul>
      </div>
      <button>Save</button>
    </div>
  );
};

export default Coupons;