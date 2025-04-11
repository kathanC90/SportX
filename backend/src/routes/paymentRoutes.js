// paymentRoutes.js
require("dotenv").config();
const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { requireAuth } = require("@clerk/express");
const Order = require("../models/order");

// Check environment variables
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing in .env file!");
  process.exit(1);
}

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
router.post("/create-razorpay-order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt = "receipt_order_123" } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const options = { amount, currency, receipt };
    const order = await razorpay.orders.create(options);

    res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error("❌ Error creating Razorpay order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Verify Razorpay Payment
router.post("/verify-razorpay-payment", requireAuth(), async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature. Payment verification failed." });
    }

    // Update order status
    const order = await Order.findOne({ where: { razorpayOrderId: razorpay_order_id } });
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.paymentStatus = "Paid";
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    res.json({ message: "Payment verified and order updated to Paid" });
  } catch (error) {
    console.error("❌ Payment verification failed:", error);
    res.status(500).json({ error: "Failed to verify payment" });
  }
});

module.exports = router;
