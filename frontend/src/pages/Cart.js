// Cart.js
import React, { useEffect, useState } from 'react';
import riceImage from '../assets/rice.jpg';
import wheatImage from '../assets/wheet.jpg';
import tomatoImage from '../assets/tomato.jpg';
import teaImage from '../assets/tea powder.jpg';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
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
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Your Cart</h2>
      <div className="row">
        {cartItems.map((item, index) => (
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
        {cartItems.length === 0 && <p className="text-center">Your cart is empty.</p>}
      </div>
    </div>
  );
}

export default CartPage;
