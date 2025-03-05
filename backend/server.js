const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const uploadRoutes = require("./src/routes/uploadRoutes"); 
const productRoutes = require("./src/routes/productRoutes");
const adminAuthRoutes = require("./src/routes/adminRoutes");

app.use("/api/upload", uploadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminAuthRoutes);

// Database Connection
const db = require("./src/models");
db.sequelize.sync() // Removed force: true to prevent data loss
  .then(() => console.log("✅ Database synced"))
  .catch((err) => console.error("❌ Error syncing database:", err));

// Check Loaded Routes
console.log("Loaded Routes:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(
      `Route: ${Object.keys(middleware.route.methods).join(", ").toUpperCase()} -> ${middleware.route.path}`
    );
  } else if (middleware.name === "router") {
    middleware.handle.stack.forEach((subMiddleware) => {
      if (subMiddleware.route) {
        console.log(
          `Route: ${Object.keys(subMiddleware.route.methods).join(", ").toUpperCase()} -> ${subMiddleware.route.path}`
        );
      }
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
