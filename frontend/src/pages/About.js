import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import "../styles/About.css"; // optional: move styles here or use styled-components
import logo from "../assets/logo.jpg"; // adjust the path if needed

const About = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" bg="light" variant="light" fixed="top" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand href="#" className="d-flex align-items-center fw-bold fs-5">
            <img
              src={logo}
              alt="Logo"
              height="40"
              width="40"
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                marginRight: "10px",
                border: "2px solid white",
                boxShadow: "0 0 5px rgba(0,0,0,0.3)",
              }}
            />
            Bargaining Bazaar
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/about" active>
                About
              </Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* About Section */}
      <Container className="about-container mt-5 pt-5">
        <div className="about-section p-4 bg-white rounded shadow-sm">
          <h2 className="about-title text-center mb-4">About Bargaining Bazaar</h2>
          <p>
            Bargaining Bazaar is not just an online marketplace — it's a revolution in how you shop.
            Our platform empowers buyers to negotiate the price of everyday essentials, fashion
            items, electronics, and more, just like at your favorite local markets.
          </p>
          <p>
            Born out of the idea that everyone should have the freedom to bargain online the same way
            they do offline, we’ve built a customer-first platform where savings, satisfaction, and
            smart shopping collide.
          </p>
          <p>We connect passionate sellers and savvy buyers in a dynamic environment where great deals are always within reach.</p>
          <ul>
            <li>🤝 Empowering customers to negotiate prices</li>
            <li>🛍️ Providing a wide variety of quality products</li>
            <li>🚚 Ensuring fast and reliable delivery</li>
            <li>💬 Delivering excellent customer support</li>
          </ul>
          <p>
            Whether you're looking for groceries, clothing, electronics, or home goods, Bargaining
            Bazaar is your go-to destination for getting the best value.
          </p>
          <p className="text-center mt-4 fw-bold">Let’s redefine shopping — together.</p>
        </div>
      </Container>
    </>
  );
};

export default About;
