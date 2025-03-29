const { Order, User } = require("../models");

// ✅ Create Order After Successful Payment
exports.createOrder = async (req, res) => {
  try {
    const { totalAmount, paymentIntentId, status } = req.body;
    const userId = req.auth?.userId; // Clerk authenticated user ID

    console.log("🟡 Received Order Request:", { userId, totalAmount, paymentIntentId, status });

    // ✅ Ensure all required fields are provided
    if (!userId || !totalAmount || !paymentIntentId) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Create the new order in the database
    const newOrder = await Order.create({
      userId,
      totalAmount,
      paymentIntentId,
      status: status || "completed", // Default to 'completed'
    });

    console.log("✅ Order Created Successfully:", newOrder.dataValues);

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error("❌ Error Creating Order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get Orders for Logged-in User
exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.auth?.userId;
    console.log("🟡 Fetching orders for user:", userId);

    if (!userId) {
      console.log("❌ User ID is missing");
      return res.status(400).json({ error: "User not authenticated" });
    }

    // Fetch orders for the user
    const orders = await Order.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      raw: true, // Convert Sequelize model to plain JSON
    });

    console.log("✅ Orders Found:", orders);

    res.status(200).json({ orders });
  } catch (error) {
    console.error("❌ Error Fetching Orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get All Orders (For Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: User, as: "user" }],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("❌ Error Fetching All Orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
