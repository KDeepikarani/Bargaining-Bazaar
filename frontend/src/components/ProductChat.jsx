/* import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ProductChat({ productId, userId, sellerId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [dealDone, setDealDone] = useState(false);

  useEffect(() => {
    socket.emit("joinRoom", { productId });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("dealDone", (data) => {
      setDealDone(true);
      setMessages((prev) => [...prev, { senderId: "System", message: data.message }]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("dealDone");
    };
  }, [productId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("sendMessage", { productId, senderId: userId, receiverId: sellerId, message: input });
    setInput("");
  };

  const confirmDeal = () => {
    socket.emit("dealConfirmed", { productId });
  };

  return (
    <div className="chat-box border p-3 mt-3">
      <h6>Real-time Bargain Chat</h6>
      <div className="messages" style={{ height: "200px", overflowY: "auto", border: "1px solid #ccc", padding: "5px" }}>
        {messages.map((msg, i) => (
          <p key={i}><b>{msg.senderId}:</b> {msg.message}</p>
        ))}
      </div>

      {!dealDone ? (
        <div className="mt-2 d-flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-control me-2"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="btn btn-primary">Send</button>
          <button onClick={confirmDeal} className="btn btn-success ms-2">Agree</button>
        </div>
      ) : (
        <button className="btn btn-warning mt-2">Buy Now</button>
      )}
    </div>
  );
}
 */
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // update if your server URL is different

const ProductChat = ({ productId }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [userName, setUserName] = useState("");
  const [showBuyNow, setShowBuyNow] = useState(false);

  // Join product room and fetch messages
  useEffect(() => {
    if (!productId) return;

    socket.emit("joinRoom", productId);

    // Listen for new messages
    socket.on("newMessage", (chat) => {
      if (chat.productId === productId) {
        setMessages((prev) => [...prev, chat]);
      }
    });

    // Fetch previous chats
    fetch(`http://localhost:3000/api/chat/${productId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));

    return () => {
      socket.off("newMessage");
    };
  }, [productId]);

  // Update Buy Now button visibility
  useEffect(() => {
    const accepted = messages.some(
      (msg) => msg.sender === "customer" && msg.accepted
    );
    setShowBuyNow(accepted);
  }, [messages]);

  const sendMessage = () => {
    if (!messageInput.trim()) return alert("Message cannot be empty");
    if (!userName.trim()) return alert("Please enter your name");

    socket.emit("sendMessage", {
      productId,
      message: messageInput,
      userName,
      sender: "customer",
    });

    setMessageInput("");
  };

  const acceptMessage = (chatId) => {
    socket.emit("acceptMessage", { chatId, productId });
  };

  return (
    <div className="product-chat">
      <h3>Chat for Product ID: {productId}</h3>
      <input
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{ marginBottom: "5px" }}
      />
      <div
        className="chat-box"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "250px",
          overflowY: "auto",
          marginBottom: "5px",
        }}
      >
        {messages.map((msg) => (
          <div key={msg._id} style={{ marginBottom: "8px" }}>
            <strong>
              {msg.userName} ({msg.sender})
            </strong>
            : {msg.message} {msg.accepted ? "✅" : ""}
            {!msg.accepted && msg.sender === "customer" && (
              <button
                onClick={() => acceptMessage(msg._id)}
                style={{ marginLeft: "5px" }}
              >
                Agree
              </button>
            )}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{ marginRight: "5px" }}
      />
      <button onClick={sendMessage}>Send</button>
      {showBuyNow && (
        <div style={{ marginTop: "10px" }}>
          <button style={{ backgroundColor: "green", color: "white" }}>
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductChat;
