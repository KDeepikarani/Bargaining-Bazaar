import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // if you have styles

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/bookings">Bookings</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/pay">Pay</Link></li>
        <li><Link to="/product">Product</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/thankyou">Thank You</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
