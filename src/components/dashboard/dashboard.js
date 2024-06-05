import React, { useState,useEffect } from 'react';
import './dashboard.css';

const currencies = [
  "1. Currency",
  "2.",
  "3.",
  "4.",
  "5.",
  "6."
];

const mediaItems = [
  "Picture 1",
  "Picture 2",
  "Picture 3",
  "Picture 4"
];

const editedPages = [
  "Homepage",
  "Comments",
  "Products",
  "Users"
];

const products = [
  { name: "Product 1", sku: "SKU1234" },
  // Add more products as needed
];

const activeUsers = [
  "Username",
  "Username",
  "Username",
  "Username"
];

const Dashboard = () => {
  const [apidata,setApidata] = useState(null);
  const [image,setImage] = useState(null);
  const [comment,setComment] = useState(null);
  const [user,setUser] = useState(null);
  const getAllCurrency = async () => {
    await fetch(`http://localhost:4000/getAllCurrency`)
      .then((res) => res.json())
      .then((data) => { setApidata(data) })

  }
  const getAllMedia = async () => {
    await fetch(`http://localhost:4000/getAllImage`)
      .then((res) => res.json())
      .then((data) => { setImage(data) })
      
  } 
  const getAllComments = async () => {
    await fetch(`http://localhost:4000/getCommentBlogReview`)
      .then((res) => res.json())
      .then((data) => { setComment(data) })

  }
  const getAllUsers = async () => {
    await fetch(`http://localhost:4000/getAllUser`)
      .then((res) => res.json())
      .then((data) => { setUser(data) })
  } 
  
  useEffect(() => {
    getAllCurrency();
    getAllMedia();
    getAllComments(); 
    getAllUsers();
  }, []);




  
  return (
    <div className="dashboard">
      <div className="card">
        <div className="card-header">
          List Of Added Currency
          <button className="expand-button">Expand</button>
        </div>
        <ul>
          {apidata && apidata.map((currency, index) => (
            <li key={index} className="sift">{index+1} - {currency.name}</li>
          ))}
        </ul>
      </div>
      <div className="card">
        <div className="card-header">
          Recently Added Media
          <button className="expand-button">Expand</button>
        </div>
        <div className="media-grid">
          {image && image.slice(0,4).map((item, index) => (
            <img key={index} className="media-item" src={item.image} />
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          Recently Edited Pages
          <button className="expand-button">Expand</button>
        </div>
        <ul>
          {editedPages.map((page, index) => (
            <li key={index} className="sift">{page}</li>
          ))}
        </ul>
      </div>
      <div className="card">
        <div className="card-header">
          Recent Comments
          <button className="expand-button">Expand</button>
        </div>
        <div className="comment-form">
          <div className="avatar"></div>
          <label>
            Name:
            {comment && (comment[0].user_name ? comment[0].user_name : comment[0].name)}
          </label>
          <label>
            Comment:
            {comment && (comment[0].body)}
          </label>
          <div className="pagination">
            <button>Previous</button>
            <button>Next</button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          Recently Added Products
          <button className="expand-button">Expand</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU Code</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card">
        <div className="card-header">
          Active Users
          <button className="expand-button">Expand</button>
        </div>
        <ul className="user-list">
          {user && user.slice(0,4).map((user, index) => (
            <li key={index}>
              <div className="avatar"></div>
              {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
