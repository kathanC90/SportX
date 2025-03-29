require("dotenv").config();
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { requireAuth } = require("@clerk/express");
const Order = require("../models/order");

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY is missing in .env file!");
  process.exit(1);
}

// ✅ Create Payment Intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    console.log(`🟡 Received request for amount: ${amount}`);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    console.log(`✅ Payment Intent Created: ${paymentIntent.id}`);

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating Payment Intent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Update Payment Status
router.post("/update-payment-status", requireAuth(), async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    if (!paymentIntentId) return res.status(400).json({ error: "Missing paymentIntentId" });

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (!paymentIntent) return res.status(404).json({ error: "Payment Intent not found" });

    const order = await Order.findOne({ where: { paymentIntentId } });
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.paymentStatus = paymentIntent.status === "succeeded" ? "Paid" : "Failed";
    await order.save();

    res.json({ message: `Order updated to ${order.paymentStatus}` });
  } catch (error) {
    console.error("❌ Payment Status Update Error:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
});

module.exports = router;
