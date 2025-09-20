// Wishlist.js
import React, { useEffect, useState } from 'react';
import riceImage from '../assets/rice.jpg';
import wheatImage from '../assets/wheet.jpg';
import tomatoImage from '../assets/tomato.jpg';
import teaImage from '../assets/tea powder.jpg';

function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    setWishlistItems(storedWishlist);
  }, []);

  const getImage = (img) => {
    switch (img) {
      case 'rice.jpg': return riceImage;
      case 'wheet.jpg': return wheatImage;
      case 'tomato.jpg': return tomatoImage;
      case 'tea powder.jpg': return teaImage;
      default: return '';
    }
  };

  const removeItem = (index) => {
    const updated = [...wishlistItems];
    updated.splice(index, 1);
    setWishlistItems(updated);
    localStorage.setItem('wishlistItems', JSON.stringify(updated));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Your Wishlist</h2>
      <div className="row">
        {wishlistItems.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <img src={getImage(item.img)} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">₹{item.price}</p>
                <button onClick={() => removeItem(index)} className="btn btn-danger">Remove</button>
              </div>
            </div>
          </div>
        ))}
        {wishlistItems.length === 0 && <p className="text-center">Your wishlist is empty.</p>}
      </div>
    </div>
  );
}

export default WishlistPage;
