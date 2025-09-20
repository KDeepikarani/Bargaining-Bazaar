// Product.js
/*import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import riceImage from '../assets/rice.jpg';
import wheatImage from '../assets/wheet.jpg';
import tomatoImage from '../assets/tomato.jpg';
import teaImage from '../assets/tea powder.jpg';

function ProductPage() {
  const products = [
    { id: 1, title: 'Rice', price: 60, img: 'rice.jpg' },
    { id: 2, title: 'Wheat', price: 40, img: 'wheet.jpg' },
    { id: 3, title: 'Sugar', price: 45, img: 'tomato.jpg' },
    { id: 4, title: 'Oil', price: 120, img: 'tea powder.jpg' },
  ];

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const storedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    setCartItems(storedCart);
    setWishlistItems(storedWishlist);
  }, []);

  const handleAddToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    alert('Product added to cart!');
  };

  const handleAddToWishlist = (product) => {
    const updatedWishlist = [...wishlistItems, product];
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
    alert('Product added to wishlist!');
  };

  const getImage = (img) => {
    switch (img) {
      case 'rice.jpg': return riceImage;
      case 'wheet.jpg': return wheatImage;
      case 'tomato.jpg': return tomatoImage;
      case 'tea powder.jpg': return teaImage;
      default: return '';
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Products</h2>
      <div className="row">
        {products.map(product => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card h-100">
              <img
                src={getImage(product.img)}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">₹{product.price}</p>
                <button onClick={() => handleAddToCart(product)} className="btn btn-primary mb-2">Add to Cart</button>
                <button onClick={() => handleAddToWishlist(product)} className="btn btn-outline-secondary">Add to Wishlist</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to="/cart" className="btn btn-success me-3">Go to Cart</Link>
        <Link to="/wishlist" className="btn btn-warning">Go to Wishlist</Link>
      </div>
    </div>
  );
}

export default ProductPage;
*/

// ProductPage.js

//  
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import riceImage from '../assets/rice.jpg';
// import wheatImage from '../assets/wheet.jpg';
// import tomatoImage from '../assets/tomato.jpg';
// import teaImage from '../assets/tea powder.jpg';
// import ProductChat from '../components/ProductChat'; // ✅ NEW

// function ProductPage() {
//   const products = [
//     { id: 1, title: 'Rice', price: 60, img: 'rice.jpg', sellerId: "SELLER1" },
//     { id: 2, title: 'Wheat', price: 40, img: 'wheet.jpg', sellerId: "SELLER2" },
//     { id: 3, title: 'Sugar', price: 45, img: 'tomato.jpg', sellerId: "SELLER3" },
//     { id: 4, title: 'Oil', price: 120, img: 'tea powder.jpg', sellerId: "SELLER4" },
//   ];

//   const [cartItems, setCartItems] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);

//   // 🔥 Replace with logged-in user later
//   const userId = "USER123";

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
//     const storedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
//     setCartItems(storedCart);
//     setWishlistItems(storedWishlist);
//   }, []);

//   const handleAddToCart = (product) => {
//     const updatedCart = [...cartItems, product];
//     setCartItems(updatedCart);
//     localStorage.setItem('cartItems', JSON.stringify(updatedCart));
//     alert('Product added to cart!');
//   };

//   const handleAddToWishlist = (product) => {
//     const updatedWishlist = [...wishlistItems, product];
//     setWishlistItems(updatedWishlist);
//     localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
//     alert('Product added to wishlist!');
//   };

//   const getImage = (img) => {
//     switch (img) {
//       case 'rice.jpg': return riceImage;
//       case 'wheet.jpg': return wheatImage;
//       case 'tomato.jpg': return tomatoImage;
//       case 'tea powder.jpg': return teaImage;
//       default: return '';
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4 text-center">Products</h2>
//       <div className="row">
//         {products.map(product => (
//           <div className="col-md-6 mb-4" key={product.id}>
//             <div className="card h-100 p-3">
//               <img
//                 src={getImage(product.img)}
//                 className="card-img-top"
//                 alt={product.title}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{product.title}</h5>
//                 <p className="card-text">₹{product.price}</p>
//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   className="btn btn-primary mb-2"
//                 >
//                   Add to Cart
//                 </button>
//                 <button
//                   onClick={() => handleAddToWishlist(product)}
//                   className="btn btn-outline-secondary"
//                 >
//                   Add to Wishlist
//                 </button>

//                 {/* ✅ Chat Section */}
//                 <ProductChat
//                   productId={product.id}
//                   userId={userId}
//                   sellerId={product.sellerId}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="text-center mt-4">
//         <Link to="/cart" className="btn btn-success me-3">Go to Cart</Link>
//         <Link to="/wishlist" className="btn btn-warning">Go to Wishlist</Link>
//       </div>
//     </div>
//   );
// }

// export default ProductPage;
 


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import riceImage from '../assets/rice.jpg';
import wheatImage from '../assets/wheet.jpg';
import tomatoImage from '../assets/tomato.jpg';
import teaImage from '../assets/tea powder.jpg';
import ProductChat from '../components/ProductChat'; // ✅ Import panna venum

function ProductPage() {
  const products = [
    { id: 1, title: 'Rice', price: 60, img: 'rice.jpg', sellerId: "SELLER1" },
    { id: 2, title: 'Wheat', price: 40, img: 'wheet.jpg', sellerId: "SELLER2" },
    { id: 3, title: 'Sugar', price: 45, img: 'tomato.jpg', sellerId: "SELLER3" },
    { id: 4, title: 'Oil', price: 120, img: 'tea powder.jpg', sellerId: "SELLER4" },
  ];

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // ✅ Replace with real logged-in user info
  const userId = "USER123";
  const userName = "Deepika"; // Example name
  const userEmail = "bepositiveand355@gmail.com"; // Example email

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const storedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    setCartItems(storedCart);
    setWishlistItems(storedWishlist);
  }, []);

  const handleAddToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    alert('Product added to cart!');
  };

  const handleAddToWishlist = (product) => {
    const updatedWishlist = [...wishlistItems, product];
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
    alert('Product added to wishlist!');
  };

  const getImage = (img) => {
    switch (img) {
      case 'rice.jpg': return riceImage;
      case 'wheet.jpg': return wheatImage;
      case 'tomato.jpg': return tomatoImage;
      case 'tea powder.jpg': return teaImage;
      default: return '';
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Products</h2>
      <div className="row">
        {products.map(product => (
          <div className="col-md-6 mb-4" key={product.id}>
            <div className="card h-100 p-3">
              <img
                src={getImage(product.img)}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">₹{product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-primary mb-2"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className="btn btn-outline-secondary mb-2"
                >
                  Add to Wishlist
                </button>

                {/* ✅ Product Chat Component – Add here */}
                <ProductChat
                  productId={product.id}
                  userId={userId}
                  userName={userName}
                  userEmail={userEmail}
                  sellerId={product.sellerId}
                  sellerEmail={`seller${product.sellerId}@example.com`} // Example email
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to="/cart" className="btn btn-success me-3">Go to Cart</Link>
        <Link to="/wishlist" className="btn btn-warning">Go to Wishlist</Link>
      </div>
    </div>
  );
}

export default ProductPage;
