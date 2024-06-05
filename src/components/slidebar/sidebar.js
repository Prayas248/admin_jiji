import React from 'react';
import './sidebar.css';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <ul>
        <Link to='/'><li>Dashboard</li></Link>
        <Link to='/Currency'><li>Multi Currency</li></Link>
        <Link to='/blog'><li>Blogs</li></Link>
        <Link to='/Library'><li>Media</li></Link>
        <Link to='/Pages'><li>Pages</li></Link>
        <Link to='/Comments'><li>Comments</li></Link>
        <Link to='/SizeChart'><li>Size Chart</li></Link>
        <Link to='/'><li>Products</li></Link>
        <Link to='/'><li>Performance</li></Link>
        <Link to='/coupon'><li>Gift Cards & Coupons</li></Link>
        <Link to='/Users'><li>Users</li></Link>
        <Link to='/Orders'><li>Orders</li></Link>
      </ul>
    </div>
  );
};

export default Sidebar;
