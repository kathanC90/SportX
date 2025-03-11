const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { requireAuth } = require("@clerk/express");
const db = require("./src/models");

dotenv.config();

const sequelize = require("./src/config/database");
const app = express();

app.use(express.json());
app.use(cors());

// ✅ Protected Route with Clerk Middleware
app.use("/api/users-merged", requireAuth(), require("./src/routes/mergeUsersRoutes"));

// ✅ Public Routes
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/products", require("./src/routes/productRoutes"));
app.use("/api/admin", require("./src/routes/adminRoutes"));

app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});

const PORT = process.env.PORT || 5000;

// ✅ Sync Database
sequelize.sync({ alter: true })
  .then(() => {
    console.log(`✅ Database synced`);
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Database sync failed:", err.message);
  });
