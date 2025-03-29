const express = require("express");
const { requireAuth } = require("@clerk/express");
const { createOrder, getOrdersByUser, getAllOrders } = require("../controllers/orderController");

const router = express.Router();

// ✅ Create Order (Authenticated Users)
router.post("/", requireAuth(), createOrder);

// ✅ Get Orders for Logged-in User
router.get("/", requireAuth(), getOrdersByUser);

// ✅ Get All Orders (Admin Only)
router.get("/all", requireAuth(), getAllOrders);

module.exports = router;
