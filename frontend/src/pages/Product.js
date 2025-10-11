

// // frontend/src/pages/Product.js
// import React, { useState, useEffect } from "react";
// import riceImage from "../assets/rice.jpg";
// import wheatImage from "../assets/wheet.jpg";
// import tomatoImage from "../assets/tomato.jpg";
// import teaImage from "../assets/tea powder.jpg";
// import ProductChat from "../components/ProductChat";

// function ProductPage() {
//   const products = [
//     { id: 1, title: "Rice", price: 60, img: "rice.jpg", sellerId: "SELLER1" },
//     { id: 2, title: "Wheat", price: 40, img: "wheet.jpg", sellerId: "SELLER2" },
//     { id: 3, title: "Sugar", price: 45, img: "tomato.jpg", sellerId: "SELLER3" },
//     { id: 4, title: "Oil", price: 120, img: "tea powder.jpg", sellerId: "SELLER4" },
//   ];

//   const [cartItems, setCartItems] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
//     setWishlistItems(JSON.parse(localStorage.getItem("wishlistItems")) || []);
//     const stored = JSON.parse(localStorage.getItem("user"));
//     if (stored && (stored.email || stored.user?.email)) {
//       // unify shape
//       const u = {
//         name: stored.name || stored.user?.name,
//         email: stored.email || stored.user?.email,
//       };
//       setUser(u);
//     }
//   }, []);

//   const handleAddToCart = (product) => {
//     const updatedCart = [...cartItems, product];
//     setCartItems(updatedCart);
//     localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//     alert("Product added to cart!");
//   };

//   const handleAddToWishlist = (product) => {
//     const updatedWishlist = [...wishlistItems, product];
//     setWishlistItems(updatedWishlist);
//     localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
//     alert("Product added to wishlist!");
//   };

//   const getImage = (img) => {
//     switch (img) {
//       case "rice.jpg":
//         return riceImage;
//       case "wheet.jpg":
//         return wheatImage;
//       case "tomato.jpg":
//         return tomatoImage;
//       case "tea powder.jpg":
//         return teaImage;
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4 text-center">Products</h2>
//       <div className="row">
//         {products.map((product) => (
//           <div className="col-md-6 mb-4" key={product.id}>
//             <div className="card h-100 p-3">
//               <img src={getImage(product.img)} className="card-img-top" alt={product.title} />
//               <div className="card-body">
//                 <h5 className="card-title">{product.title}</h5>
//                 <p className="card-text">₹{product.price}</p>
//                 <button onClick={() => handleAddToCart(product)} className="btn btn-primary mb-2">
//                   Add to Cart
//                 </button>
//                 <button onClick={() => handleAddToWishlist(product)} className="btn btn-outline-secondary mb-2">
//                   Add to Wishlist
//                 </button>

//                 {/* ProductChat: pass sellerEmail and user info */}
//                 <ProductChat
//                   productId={product.id}
//                   sellerEmail={`seller${product.sellerId}@example.com`}
//                   userName={user?.name}
//                   userEmail={user?.email}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductPage;




// frontend/src/pages/Product.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import riceImage from "../assets/rice.jpg";
import wheatImage from "../assets/wheet.jpg";
import tomatoImage from "../assets/tomato.jpg";
import teaImage from "../assets/tea powder.jpg";
import ProductChat from "../components/ProductChat";

function ProductPage() {
  const navigate = useNavigate();

  const products = [
    { id: 1, title: "Rice", price: 60, img: "rice.jpg", sellerId: "SELLER1" },
    { id: 2, title: "Wheat", price: 40, img: "wheet.jpg", sellerId: "SELLER2" },
    { id: 3, title: "Sugar", price: 45, img: "tomato.jpg", sellerId: "SELLER3" },
    { id: 4, title: "Oil", price: 120, img: "tea powder.jpg", sellerId: "SELLER4" },
  ];

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
    setWishlistItems(JSON.parse(localStorage.getItem("wishlistItems")) || []);
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored && (stored.email || stored.user?.email)) {
      const u = {
        name: stored.name || stored.user?.name,
        email: stored.email || stored.user?.email,
      };
      setUser(u);
    }
  }, []);

  const handleAddToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    alert("Product added to cart!");
  };

  const handleAddToWishlist = (product) => {
    const updatedWishlist = [...wishlistItems, product];
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
    alert("Product added to wishlist!");
  };

  const getImage = (img) => {
    switch (img) {
      case "rice.jpg": return riceImage;
      case "wheet.jpg": return wheatImage;
      case "tomato.jpg": return tomatoImage;
      case "tea powder.jpg": return teaImage;
      default: return "";
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-6 mb-4" key={product.id}>
            <div className="card h-100 p-3">
              <img src={getImage(product.img)} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">₹{product.price}</p>

                <button onClick={() => handleAddToCart(product)} className="btn btn-primary mb-2">
                  Add to Cart
                </button>
                <button onClick={() => handleAddToWishlist(product)} className="btn btn-outline-secondary mb-2">
                  Add to Wishlist
                </button>

                {/* Product Chat */}
                <ProductChat
                  productId={product.id}
                  sellerEmail={`seller${product.sellerId}@example.com`}
                  userName={user?.name}
                  userEmail={user?.email}
                />

                {/* Agree / Disagree buttons */}
                <div className="d-flex justify-content-between mt-3">
                  <button onClick={() => navigate("/Pay")} className="btn btn-success">
                    Agree
                  </button>
                  <button onClick={() => navigate("/Home")} className="btn btn-danger">
                    Disagree
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;


