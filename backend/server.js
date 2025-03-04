const express = require("express");
const cors = require("cors");
const pool = require("./src/config/db"); // Ensure db.js is correctly set

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Test API
app.get("/", (req, res) => {
  res.send("SportX API is running 🚀");
});

// ✅ Fetch Products
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: "Server error. Unable to fetch products." });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on http://localhost:${PORT}`));
