import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ This line is correct
import './styles/index.css'; // ✅ Check if this file exists

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
