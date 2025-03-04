const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", // Your PostgreSQL username
  host: "localhost",
  database: "sportx", // Use the correct database name
  password: "123456789", // Your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch((err) => console.error("❌ PostgreSQL connection error:", err));

module.exports = pool;
