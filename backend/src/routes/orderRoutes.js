const express = require("express");
const { requireAuth } = require("@clerk/express");
const { createOrder, getAllOrders } = require("../controllers/orderController");
const { User, Order } = require("../models");

const router = express.Router();

// ✅ Create Order (Authenticated Users)
router.post("/", requireAuth(), createOrder);

// ✅ Get Orders (Admin sees all, user sees only their own)
router.get("/", requireAuth(), async (req, res) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch user to determine role
    const dbUser = await User.findOne({ where: { clerkId: userId } });

    if (!dbUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    const isAdmin = dbUser.role === "admin";

    const orders = await Order.findAll({
      where: isAdmin ? {} : { userId: dbUser.id },
      include: [{ model: User, as: "user" }], // 👈 Use the alias!
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Optional: Admin-only route for all orders (can be used for strict access)
router.get("/all", requireAuth(), getAllOrders);

module.exports = router;
