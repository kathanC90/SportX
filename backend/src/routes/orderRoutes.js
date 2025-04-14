// routes/orderRoutes.js
const express = require("express");
const { requireAuth } = require("@clerk/express");
const { User, Order } = require("../models");

const router = express.Router();

// Get orders for the current user
router.get("/", requireAuth(), async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    console.log("GET /api/orders | Clerk User ID:", clerkUserId);

    const dbUser = await User.findOne({ where: { clerkId: clerkUserId } });
    if (!dbUser) {
      return res.status(404).json({ error: "User not found in DB" });
    }

    const orders = await Order.findAll({
      where: { userId: dbUser.id },
      order: [["createdAt", "DESC"]],
      raw: true,
    });

    // Parse shipping address from JSON string
    const formattedOrders = orders.map(order => ({
      ...order,
      shippingAddress: order.shippingAddress ? JSON.parse(order.shippingAddress) : null
    }));

    console.log(`Found ${orders.length} orders for user ${dbUser.id}`);
    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Order fetch error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// Get order by ID
router.get("/:id", requireAuth(), async (req, res) => {
  try {
    const orderId = req.params.id;
    const clerkUserId = req.auth.userId;

    const dbUser = await User.findOne({ where: { clerkId: clerkUserId } });
    if (!dbUser) {
      return res.status(404).json({ error: "User not found in DB" });
    }

    const order = await Order.findOne({
      where: { 
        id: orderId,
        userId: dbUser.id 
      },
      raw: true
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Parse shipping address from JSON string
    if (order.shippingAddress) {
      order.shippingAddress = JSON.parse(order.shippingAddress);
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Order fetch error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;