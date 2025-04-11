import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const amountInPaise = Math.round(totalAmount * 100);

  // Helper to load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpay = async () => {
    setLoading(true);
    setMessage(null);

    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      setMessage({ type: "error", text: "Failed to load Razorpay SDK." });
      setLoading(false);
      return;
    }

    try {
      const { data: order } = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment/create-razorpay-order`,
        { amount: amountInPaise }
      );

      if (!order || !order.id) {
        throw new Error("Razorpay order creation failed");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "SportX",
        description: "Purchase your sports gear",
        image: "/logo.png",
        order_id: order.id,
        handler: async function (response) {
          try {
            await axios.post(
              `${import.meta.env.VITE_API_URL}/payment/verify-razorpay-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            setMessage({ type: "success", text: "Payment successful! Redirecting..." });
            clearCart();
            setTimeout(() => navigate("/orders"), 2000);
          } catch (err) {
            console.error("Verification error", err);
            setMessage({ type: "error", text: "Payment verification failed." });
          }
        },
        prefill: {
          name: user.fullName || "",
          email: user.primaryEmailAddress?.emailAddress || "",
        },
        theme: { color: "#1f2937" },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment error", error);
      setMessage({ type: "error", text: "Payment initiation failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl p-4 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
        {cart.map((item) => (
          <div key={item.id} className="mb-2">
            {item.name} x {item.quantity} - ₹{item.price * item.quantity}
          </div>
        ))}
        <div className="my-4 text-xl font-semibold">Total: ₹{totalAmount}</div>

        {message && (
          <div
            className={`mb-4 p-2 rounded ${
              message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          onClick={handleRazorpay}
          disabled={loading || cart.length === 0}
          className="px-6 py-2 text-white bg-blue-600 rounded shadow hover:bg-blue-700"
        >
          {loading ? "Processing..." : "Pay with Razorpay"}
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
