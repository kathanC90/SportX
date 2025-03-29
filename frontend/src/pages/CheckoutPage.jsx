import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Load Stripe securely using VITE environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const { cart, clearCart } = useCart();
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // 🔹 Calculate total amount
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalAmountInCents = Math.round(totalAmount * 100);

  // 🔹 Handle Payment Submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setMessage({ type: "error", text: "Stripe is not loaded yet!" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setMessage({ type: "error", text: "Please enter card details." });
        setLoading(false);
        return;
      }

      // 🔹 Generate clientSecret on submission
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/payment/create-payment-intent`, {
        amount: totalAmountInCents,
      });

      if (!res.data?.clientSecret) {
        setMessage({ type: "error", text: "Payment setup failed." });
        setLoading(false);
        return;
      }

      // 🔹 Confirm Payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(res.data.clientSecret, {
        payment_method: { card: cardElement },
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
        setLoading(false);
        return;
      }

      // ✅ Payment Success
      await axios.post(`${import.meta.env.VITE_API_URL}/payment/update-payment-status`, {
        paymentIntentId: paymentIntent.id,
      });

      setMessage({ type: "success", text: "Payment successful! Redirecting..." });
      clearCart();
      setTimeout(() => navigate("/orders"), 2000);
    } catch (error) {
      console.error("Payment Error:", error);
      setMessage({ type: "error", text: "Payment failed. Try again." });
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg max-w-md w-full">
      <h2 className="text-2xl font-semibold mb-4 text-center">Checkout</h2>
      <p className="text-gray-600 text-center mb-4">
        Total: <strong>${totalAmount.toFixed(2)}</strong>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border p-3 rounded-md shadow-sm bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </div>

        {message && (
          <div
            className={`text-center p-2 rounded-md ${
              message.type === "error" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !stripe || !elements}
          className="w-full p-3 bg-black text-white rounded-lg hover:opacity-80 transition"
        >
          {loading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow p-6 bg-gray-100 flex justify-center items-center">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
