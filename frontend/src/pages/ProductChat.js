/* import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ProductChat = ({ productId, sellerEmail }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !user.email) return;

    // Join room
    socket.emit("joinRoom", {
      productId,
      senderEmail: user.email,
      sellerEmail
    });

    // Listen messages
    socket.on("receiveMessage", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [productId, sellerEmail, user]);

  const sendMessage = () => {
    if (!input || !user) return;

    socket.emit("sendMessage", {
      productId,
      userName: user.name,
      sender: "customer",
      message: input,
      senderEmail: user.email,
      sellerEmail
    });

    setInput("");
  };

  if (!user) return <p>Please login/signup to chat.</p>;

  return (
    <div>
      <div>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <b>{msg.userName}:</b> {msg.message}
          </div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message"/>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ProductChat;
 */




/* import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // ✅ backend server

function ProductChat({ productId, sellerEmail }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Get logged-in user
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser || !loggedUser.email) {
      console.log("User not logged in. Redirect to login.");
      return;
    }
    setUser(loggedUser);

    // ✅ Join room only if all data exists
    if (productId && sellerEmail) {
      socket.emit("joinRoom", {
        productId,
        senderEmail: loggedUser.email,
        sellerEmail,
      });
    }

    // Listen for incoming messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [productId, sellerEmail]);

  const handleSend = () => {
    if (!input.trim() || !user) return;

    socket.emit("sendMessage", {
      productId,
      userName: user.name,
      sender: "customer",
      message: input,
      senderEmail: user.email,
      sellerEmail,
    });

    setInput(""); // clear input
  };

  return (
    <div className="chat-container" style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h3>Product Chat</h3>
      <div className="messages" style={{ minHeight: "200px", marginBottom: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: "5px 0" }}>
            <strong>{msg.userName}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
        style={{ width: "80%", padding: "5px" }}
      />
      <button onClick={handleSend} style={{ width: "18%", marginLeft: "2%" }}>
        Send
      </button>
    </div>
  );
}

export default ProductChat;
 */