import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Bookings from "./pages/Bookings";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Pay from "./pages/Pay";
import Product from "./pages/Product";
import SignupPage from "./pages/SignupPage";
import Thankyou from "./pages/Thankyou";
import Login from "./pages/Login"; // ❗You had written LoginPage instead of Login
import Wishlist from "./pages/Wishlist"; // ✅ Whishlist spelling is consistent

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
  <Route path="/" element={<Home />} />        {/* NEW default route */}
  <Route path="/home" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/bookings" element={<Bookings />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/pay" element={<Pay />} />
  <Route path="/product" element={<Product />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/thankyou" element={<Thankyou />} />
  <Route path="/login" element={<Login />} />
  <Route path="/wishlist" element={<Wishlist />} />
</Routes>

      <Footer />
    </Router>
  );
}

export default App;
