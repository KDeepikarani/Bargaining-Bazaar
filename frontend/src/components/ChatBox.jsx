// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000"); // ✅ backend port

// const ChatBox = ({ productId, userName, sender, userEmail, sellerEmail }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMsg, setNewMsg] = useState("");
//   const [notification, setNotification] = useState("");

//   useEffect(() => {
//     // Join product room
//     socket.emit("joinRoom", productId);

//     // Listen for new messages
//     socket.on("newMessage", (msg) => {
//       if (msg.productId === productId) {
//         setMessages((prev) => [...prev.filter((m) => m._id !== msg._id), msg]);

//         // ✅ Notification logic
//         if (sender === "seller" && msg.sender === "customer") {
//           setNotification(`🔔 New message from ${msg.userName}: ${msg.message}`);
//           setTimeout(() => setNotification(""), 5000);
//         }
//         if (sender === "customer" && msg.sender === "seller") {
//           setNotification(`📩 Seller replied: ${msg.message}`);
//           setTimeout(() => setNotification(""), 5000);
//         }
//       }
//     });

//     return () => {
//       socket.off("newMessage");
//     };
//   }, [productId, sender]);

//   // Send message
//   const sendMessage = () => {
//     if (!newMsg.trim()) return alert("Message cannot be empty");

//     socket.emit("sendMessage", {
//       productId,
//       message: newMsg,
//       userName,
//       sender, // "customer" or "seller"
//       userEmail, // ✅ needed for email notification
//       sellerEmail, // ✅ pass seller email from props
//     });
//     setNewMsg("");
//   };

//   // Accept message (seller agreeing)
//   const acceptMessage = (chatId) => {
//     socket.emit("acceptMessage", { chatId, productId });
//   };

//   // Buy button only if both sides agreed
//   const isBuyVisible = () => {
//     const customerAccepted = messages.some(
//       (msg) => msg.sender === "customer" && msg.accepted
//     );
//     const sellerAccepted = messages.some(
//       (msg) => msg.sender === "seller" && msg.accepted
//     );
//     return customerAccepted && sellerAccepted;
//   };

//   return (
//     <div className="chat-container">
//       <h3>Chat for Product {productId}</h3>

//       {/* ✅ Notification */}
//       {notification && (
//         <div
//           style={{
//             background: "yellow",
//             padding: "5px",
//             marginBottom: "10px",
//             fontWeight: "bold",
//           }}
//         >
//           {notification}
//         </div>
//       )}

//       <div
//         className="chat-box"
//         style={{
//           height: "250px",
//           overflowY: "auto",
//           border: "1px solid #ccc",
//           padding: "10px",
//         }}
//       >
//         {messages.map((msg) => (
//           <div
//             key={msg._id}
//             className="chat-message"
//             style={{ marginBottom: "10px" }}
//           >
//             <strong>
//               {msg.userName} ({msg.sender}):
//             </strong>{" "}
//             {msg.message} {msg.accepted && "✅"}
//             {!msg.accepted &&
//               msg.sender !== "customer" &&
//               sender === "seller" && (
//                 <button
//                   onClick={() => acceptMessage(msg._id)}
//                   style={{ marginLeft: "10px" }}
//                 >
//                   Agree
//                 </button>
//               )}
//           </div>
//         ))}
//       </div>

//       <div style={{ marginTop: "10px" }}>
//         <input
//           type="text"
//           placeholder="Type your message"
//           value={newMsg}
//           onChange={(e) => setNewMsg(e.target.value)}
//           style={{ width: "70%", padding: "5px" }}
//         />
//         <button
//           onClick={sendMessage}
//           style={{ marginLeft: "5px", padding: "5px 10px" }}
//         >
//           Send
//         </button>
//       </div>

//       {isBuyVisible() && (
//         <button
//           className="buy-now"
//           style={{
//             marginTop: "10px",
//             padding: "8px 15px",
//             background: "green",
//             color: "white",
//             border: "none",
//           }}
//         >
//           Buy Now
//         </button>
//       )}
//     </div>
//   );
// };

// export default ChatBox;

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // ✅ backend port

const ChatBox = ({ productId, userName, sender, userEmail, sellerEmail }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    // Join product room
    socket.emit("joinRoom", productId);

    // Listen for new messages
    socket.on("newMessage", (msg) => {
      if (msg.productId === productId) {
        setMessages((prev) => [...prev.filter((m) => m._id !== msg._id), msg]);

        // ✅ Fixed Notification logic
        if (sender === "seller" && msg.sender === "customer") {
          setNotification(`🔔 New message from ${msg.userName}: ${msg.message}`);
          setTimeout(() => setNotification(""), 5000);
        }

        if (sender === "customer" && msg.sender === "seller") {
          setNotification(`📩 Seller replied: ${msg.message}`);
          setTimeout(() => setNotification(""), 5000);
        }
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [productId, sender]);

  // Send message
  const sendMessage = () => {
    if (!newMsg.trim()) return alert("Message cannot be empty");

    socket.emit("sendMessage", {
      productId,
      message: newMsg,
      userName,
      sender,       // "customer" or "seller"
      userEmail,    // ✅ needed for email notification
      sellerEmail,  // ✅ needed for email notification
    });

    setNewMsg("");
  };

  // Accept message (seller agreeing)
  const acceptMessage = (chatId) => {
    socket.emit("acceptMessage", { chatId, productId });
  };

  // Buy button only if both sides agreed
  const isBuyVisible = () => {
    const customerAccepted = messages.some(
      (msg) => msg.sender === "customer" && msg.accepted
    );
    const sellerAccepted = messages.some(
      (msg) => msg.sender === "seller" && msg.accepted
    );
    return customerAccepted && sellerAccepted;
  };

  return (
    <div className="chat-container">
      <h3>Chat for Product {productId}</h3>

      {/* ✅ Notification */}
      {notification && (
        <div
          style={{
            background: "yellow",
            padding: "5px",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          {notification}
        </div>
      )}

      <div
        className="chat-box"
        style={{
          height: "250px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="chat-message"
            style={{ marginBottom: "10px" }}
          >
            <strong>
              {msg.userName} ({msg.sender}):
            </strong>{" "}
            {msg.message} {msg.accepted && "✅"}
            {!msg.accepted &&
              msg.sender !== "customer" &&
              sender === "seller" && (
                <button
                  onClick={() => acceptMessage(msg._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Agree
                </button>
              )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Type your message"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          style={{ width: "70%", padding: "5px" }}
        />
        <button
          onClick={sendMessage}
          style={{ marginLeft: "5px", padding: "5px 10px" }}
        >
          Send
        </button>
      </div>

      {isBuyVisible() && (
        <button
          className="buy-now"
          style={{
            marginTop: "10px",
            padding: "8px 15px",
            background: "green",
            color: "white",
            border: "none",
          }}
        >
          Buy Now
        </button>
      )}
    </div>
  );
};

export default ChatBox;
