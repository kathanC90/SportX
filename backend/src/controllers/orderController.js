const { Order, User } = require("../models");

// ✅ Create Order After Successful Payment
exports.createOrder = async (req, res) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Clerk user ID missing" });
    }

    const { totalAmount, paymentIntentId, status } = req.body;

    if (!totalAmount || !paymentIntentId) {
      return res.status(400).json({ message: "Missing required fields: totalAmount or paymentIntentId" });
    }

    // Check if user exists in the DB (by clerkId)
    const dbUser = await User.findOne({ where: { clerkId: userId } });

    if (!dbUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    // Create order with correct references and defaults
    const order = await Order.create({
      userId: dbUser.clerkId, // Matches userId reference to clerkId in model
      totalAmount,
      paymentIntentId,
      status: status || "pending", // Default to "pending" as per model
    });

    return res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get Orders for Logged-in User
exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(400).json({ error: "User not authenticated" });
    }

    const orders = await Order.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      raw: true,
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get All Orders (Admin Only)
exports.getAllOrders = async (req, res) => {
  try {
    const role = req.auth?.sessionClaims?.role || req.auth?.claims?.role;
    if (role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const orders = await Order.findAll({
      include: [{
        model: User,
        as: "user",
        attributes: ["id", "firstName", "lastName"],
      }],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
