const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { requireAuth } = require("@clerk/express");
dotenv.config();
const sequelize = require("./src/config/database");
const app = express();


// ✅ Optimized CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // ✅ Allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ Allow all methods
  allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow required headers
  credentials: true, // ✅ Allow cookies & auth headers
};

app.use(cors(corsOptions)); // ✅ Apply CORS once
app.options("*", cors(corsOptions)); // ✅ Handle preflight OPTIONS request

app.use(express.json()); // ✅ JSON parser middleware

// ✅ Protected Route with Clerk Middleware
app.use("/api/users-merged", requireAuth(), require("./src/routes/mergeUsersRoutes"));

// ✅ Public Routes
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/products", require("./src/routes/productRoutes"));
app.use("/api/admin", require("./src/routes/adminRoutes"));
app.use("/api/payment", require("./src/routes/paymentRoutes"));
app.use("/api/orders", require("./src/routes/orderRoutes")); // 

app.use("/api/users/edit", require("./src/routes/editprofileroutes"));
// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});




// ✅ Sync Database and start server
const PORT = process.env.PORT || 5000;
sequelize
  .sync({ alter: true }) // ✅ Use `force: false` to prevent data loss
  .then(() => {
    console.log(`✅ Database synced`);
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Database sync failed:", err.message);
  });
