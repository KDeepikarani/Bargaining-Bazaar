import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Thankyou.css";

const Thankyou = () => {
  return (
    <div className="thankyou-page">
      <div className="thank-you">
        <h1>✅ Payment Successful</h1>
        <p>Thank you for shopping with Bargaining Bazaar!</p>
        <a href="/home" className="btn btn-light mt-3">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default Thankyou;
