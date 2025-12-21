// Function to start Razorpay Payment
async function startPayment() {
  const amount = 799; // ₹799 (you can make this dynamic)

  try {
    // 1. Call backend to create order
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount })
    });

    const data = await response.json();

    if (!data.success) {
      alert("❌ Payment initiation failed");
      return;
    }

    // 2. Configure Razorpay options
    const options = {
      key: data.key, // Razorpay API Key from backend
      amount: data.amount,
      currency: data.currency,
      name: "Bargaining Bazaar",
      description: "Chat Bargain Product Payment",
      order_id: data.orderId, // Order ID from Razorpay
      handler: function (response) {
        alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
        window.location.href = "thankyou.html"; // Redirect on success
      },
      prefill: {
        name: "Customer",
        email: "customer@example.com"
      },
      theme: {
        color: "#007bff"
      }
    };

    // 3. Open Razorpay payment popup
    const rzp = new Razorpay(options);
    rzp.open();
  } catch (err) {
    alert("⚠️ Something went wrong. Please try again.");
    console.error("Payment Error:", err);
  }
}
