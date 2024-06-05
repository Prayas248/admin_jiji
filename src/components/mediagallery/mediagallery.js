
import React from 'react';
import './mediagallery.css';

const ImageGallery = () => {
  //  3000 images
  const images = new Array(3000).fill(0);

  return (
    <div className="library">
        <div className="mediabut">
        <h2>Library</h2>
         <button className="but">Add new</button></div>
      <div className="toolbar">
        <select>
          <option >All files</option>
        </select>
        <select>
          <option >All Dates</option>
        </select>
        <button className="mediabutton">Bulk Select</button>
      </div>
      <input className="searchmedia" type="text" placeholder="Search" />
      <div className="grid">
        {images.slice(0, 16).map((_, index) => (
          <div className="image-container" key={index}>
            <div className="image-placeholder">Img</div>
          </div>
        ))}
      </div>
      <button className="load-more">Load more</button>
      <div className="footer">Showing 12 of 3000</div>
    </div>
  );
};

export default ImageGallery;
