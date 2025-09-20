/* import React from "react";

export default function PaymentPage() {
  const handlePay = () => {
    alert("Payment Successful ✅");
    window.location.href = "/thankyou";
  };

  return (
    <div>
      <h2>Payment Gateway</h2>
      <button onClick={handlePay}>Pay Now</button>
    </div>
  );
}
 */


/*
import React from "react";
import ChatBox from "../components/ChatBox";

const products = [
  { _id: "64f1a1e1a1b2c3d4e5f6a7b8", name: "Product 1" },
  { _id: "64f1a1e1a1b2c3d4e5f6a7b9", name: "Product 2" },
];

const ProductPage = () => {
  const userName = "Deepika"; // Or dynamically from login

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product._id} className="product">
          <h3>{product.name}</h3>
          <ChatBox productId={product._id} userName={userName} />
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
*/



import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io("http://localhost:5000"); // backend server

function ProductChat({ productId, userId, sellerId }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // Replace these with actual data from your login
// Assume you store login user in localStorage
const user = JSON.parse(localStorage.getItem("user"));

const userEmail = user ? user.email : null; 
const userName = user ? user.name : "Anonymous";
const sellerEmail = "bargainingbazaar20@gmail.com"; // or load from seller profile


  useEffect(() => {
    socket.emit('joinRoom', { productId });

  socket.on('newMessage', (chat) => {
  setChatHistory(prev => [...prev, { from: chat.userName || chat.sender, message: chat.message }]);
});

return () => {
  socket.off('newMessage');
};

  }, [productId]);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    setChatHistory(prev => [...prev, { from: 'You', message }]);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/chat/send-message`, {
        productId,
        userId,
        sellerId,
        message,
        from: 'You',
        userEmail,
        sellerEmail
      });
socket.emit("sendMessage", {
  productId,
  message,
  userName,
  sender: user ? "customer" : "guest", 
  userEmail,
  sellerEmail
});


      setMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="mt-3">
      <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {chatHistory.map((chat, index) => (
          <div key={index}><strong>{chat.from}:</strong> {chat.message}</div>
        ))}
      </div>
      <div className="input-group mt-2">
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ProductChat;
