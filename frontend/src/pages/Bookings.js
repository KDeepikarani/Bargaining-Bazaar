// Booking.js

import React, { useState, useEffect } from "react";
import "../styles/booking.css";
import rice from "../assets/rice.jpg";
import wheet from "../assets/wheet.jpg";
import tomato from "../assets/tomato.jpg";
import tea from "../assets/tea powder.jpg";

function Booking() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [messages, setMessages] = useState({}); // Store messages per item index

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const storedWishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setCartItems(storedCart);
    setWishlistItems(storedWishlist);
  }, []);

  const getImage = (imgName) => {
    switch (imgName) {
      case "rice.jpg":
        return rice;
      case "wheet.jpg":
        return wheet;
      case "tomato.jpg":
        return tomato;
      case "tea powder.jpg":
        return tea;
      default:
        return "";
    }
  };

  const removeCartItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const removeWishlistItem = (index) => {
    const updatedWishlist = [...wishlistItems];
    updatedWishlist.splice(index, 1);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
  };

  const handleMessageChange = (index, value) => {
    setMessages((prev) => ({ ...prev, [index]: value }));
  };

  const handleSendMessage = (index) => {
    alert(`Message sent to seller for ${cartItems[index].title}: ${messages[index] || ""}`);
    setMessages((prev) => ({ ...prev, [index]: "" })); // Clear message
  };

  return (
    <div className="booking-container">
      <h2>🛒 Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="item-grid">
          {cartItems.map((item, index) => (
            <div className="item-card" key={index}>
              <img src={getImage(item.img)} alt={item.title} className="item-img" />
              <h3>{item.title}</h3>
              <p>Price: ₹{item.price}</p>

              {/* Message box */}
              <textarea
                rows="2"
                placeholder="Enter message to seller..."
                value={messages[index] || ""}
                onChange={(e) => handleMessageChange(index, e.target.value)}
              />
              <button onClick={() => handleSendMessage(index)}>Send Message</button>
              <br />
              <button onClick={() => removeCartItem(index)}>Remove from Cart</button>
            </div>
          ))}
        </div>
      )}

      <h2>❤️ Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="item-grid">
          {wishlistItems.map((item, index) => (
            <div className="item-card" key={index}>
              <img src={getImage(item.img)} alt={item.title} className="item-img" />
              <h3>{item.title}</h3>
              <p>Price: ₹{item.price}</p>
              <button onClick={() => removeWishlistItem(index)}>Remove from Wishlist</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Booking;
