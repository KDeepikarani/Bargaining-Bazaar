
// frontend/src/components/ProductChat.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

// const socket = io("http://localhost:5000");
const socket = io(process.env.REACT_APP_API_UR);

function ProductChat({ productId, sellerEmail, userName: propUserName, userEmail: propUserEmail }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState({
    name: propUserName || null,
    email: propUserEmail || null
  });

  // read localStorage if props not supplied
  useEffect(() => {
    if (!user.name || !user.email) {
      const stored = JSON.parse(localStorage.getItem("user"));
      if (stored) setUser({ name: stored.name || stored.user?.name, email: stored.email || stored.user?.email });
    }
  }, []); // run once

  useEffect(() => {
    if (!productId || !sellerEmail || !user?.email) return;

    // join private room (server will expect senderEmail & sellerEmail)
    socket.emit("joinRoom", {
      productId: String(productId),
      senderEmail: user.email,
      sellerEmail: sellerEmail
    });

    // fetch existing chats for this product, then filter to only show messages between this customer & seller

    //`http://localhost:5000/api/chats/${productId}`
    const fetchChats = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/chats/${productId}`);
        const all = res.data || [];
        const pair = all.filter(c => {
          // show messages where pair matches (either direction)
          const a = c.senderEmail === user.email && c.sellerEmail === sellerEmail;
          const b = c.senderEmail === sellerEmail && c.sellerEmail === user.email;
          return a || b;
        });
        setMessages(pair);
      } catch (err) {
        console.error("Fetch chats error:", err);
      }
    };
    fetchChats();

    // listen realtime
    const handler = (msg) => {
      // show only messages for this private pair
      if (!msg) return;
      const a = msg.senderEmail === user.email && msg.sellerEmail === sellerEmail;
      const b = msg.senderEmail === sellerEmail && msg.sellerEmail === user.email;
      if (a || b) setMessages(prev => [...prev, msg]);
    };
    socket.on("receiveMessage", handler);

    return () => {
      socket.off("receiveMessage", handler);
    };
  }, [productId, sellerEmail, user?.email]);

  const sendMessage = async () => {
    if (!input.trim() || !user?.email) return;
const payload = {
  productId: String(productId),
  userName: user.name || propUserName || "Anonymous",
  sender: "customer",
  message: input.trim(),
  senderEmail: user.email,
  sellerEmail: "bargainingbazaar20@gmail.com" // <- permanent seller mail
};


    
   /* const payload = {
      productId: String(productId),
      userName: user.name || propUserName || "Anonymous",
      sender: "customer",
      message: input.trim(),
      senderEmail: user.email,
      sellerEmail
    };*/




    // emit realtime
    socket.emit("sendMessage", payload);

    // persist via REST as well (optional double-write is safe)
    /* try {
      await axios.post("http://localhost:5000/api/chats", payload);
    } catch (err) {
      console.error("Save chat error:", err);
    } */


      try {
  // Use backend URL from environment variable (works in local + deployed)
  await axios.post(
    `${process.env.REACT_APP_API_URL}/api/chats`,
    payload
  );
} catch (err) {
  console.error("Save chat error:", err);
}

    // UI immediate update
    setMessages(prev => [...prev, payload]);
    setInput("");
  };

  if (!user?.email) {
    return <div>Please login/signup to use chat.</div>;
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 10, marginTop: 8 }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Chat with seller</div>
      <div style={{ maxHeight: 220, overflowY: "auto", padding: 6, border: "1px solid #eee", marginBottom: 8 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <strong>{m.userName || (m.senderEmail === user.email ? user.name : "Seller")}:</strong> {m.message}
            <div style={{ fontSize: 11, color: "#666" }}>{new Date(m.createdAt || Date.now()).toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={sendMessage} style={{ marginLeft: 8, padding: "8px 12px" }}>Send</button>
      </div>
    </div>
  );
}

export default ProductChat;
  

