/* // import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");

// export default function ChatBox({ user, otherUser }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     socket.on("receiveMessage", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     socket.on("priceAgreed", (data) => {
//       alert(`✅ Price agreed: ${data.price}`);
//       window.location.href = "/payment"; // redirect
//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.off("priceAgreed");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (input.trim() === "") return;
//     const msg = { sender: user, receiver: otherUser, text: input };
//     socket.emit("sendMessage", msg);
//     setInput("");
//   };

//   const agreePrice = () => {
//     socket.emit("agreePrice", { customer: user, seller: otherUser, price: "Final Price" });
//   };

//   return (
//     <div className="chat-box">
//       <div className="messages">
//         {messages.map((m, i) => (
//           <p key={i}><b>{m.sender}:</b> {m.text}</p>
//         ))}
//       </div>
//       <input value={input} onChange={(e) => setInput(e.target.value)} />
//       <button onClick={sendMessage}>Send</button>
//       <button onClick={agreePrice} style={{ background: "green", color: "white" }}>
//         Agree
//       </button>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";

const ChatBox = ({ productId, userName }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // Load chat messages
  const loadChat = async () => {
    const res = await fetch(`/api/chat/${productId}`);
    const data = await res.json();
    setMessages(data);
  };

  // Send message
  const sendMessage = async () => {
    if (!newMsg.trim()) return alert("Message cannot be empty");

    await fetch("/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        userName,
        message: newMsg,
        sender: "customer",
      }),
    });
    setNewMsg("");
    loadChat();
  };

  // Accept a message (seller clicks Agree)
  const acceptMessage = async (chatId) => {
    await fetch("/api/chat/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId }),
    });
    loadChat();
  };

  // Check if Buy Now should appear
  const isBuyVisible = () => {
    // Must have at least one customer message AND one seller message accepted
    const customerAccepted = messages.filter(
      (msg) => msg.sender === "customer" && msg.accepted
    ).length > 0;
    const sellerAccepted = messages.filter(
      (msg) => msg.sender === "seller" && msg.accepted
    ).length > 0;
    return customerAccepted && sellerAccepted;
  };

  useEffect(() => {
    loadChat();
    const interval = setInterval(loadChat, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg._id} className="chat-message">
            <strong>
              {msg.userName} ({msg.sender}):
            </strong>{" "}
            {msg.message} {msg.accepted && "✅"}
            {!msg.accepted && msg.sender !== userName && (
              <button
                onClick={() => acceptMessage(msg._id)}
                className="agree-btn"
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
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      {isBuyVisible() && <button className="buy-now">Buy Now</button>}
    </div>
  );
};

export default ChatBox;
 */

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Update if different port

const ChatBox = ({ productId, userName }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", productId);

    socket.on("newMessage", (msg) => {
      if (msg.productId === productId) {
        setMessages((prev) => [...prev.filter(m => m._id !== msg._id), msg]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [productId]);

  const sendMessage = () => {
    if (!newMsg.trim()) return alert("Message cannot be empty");

    socket.emit("sendMessage", {
      productId,
      message: newMsg,
      userName,
      sender: "customer",
    });
    setNewMsg("");
  };

  const acceptMessage = (chatId) => {
    socket.emit("acceptMessage", { chatId, productId });
  };

  const isBuyVisible = () => {
    const customerAccepted = messages.filter(
      (msg) => msg.sender === "customer" && msg.accepted
    ).length > 0;
    const sellerAccepted = messages.filter(
      (msg) => msg.sender === "seller" && msg.accepted
    ).length > 0;
    return customerAccepted && sellerAccepted;
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg._id} className="chat-message">
            <strong>
              {msg.userName} ({msg.sender}):
            </strong>{" "}
            {msg.message} {msg.accepted && "✅"}
            {!msg.accepted && msg.sender !== "customer" && (
              <button onClick={() => acceptMessage(msg._id)}>Agree</button>
            )}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Type your message"
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      {isBuyVisible() && <button className="buy-now">Buy Now</button>}
    </div>
  );
};

export default ChatBox;
