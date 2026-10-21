const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a single MySQL connection pool with fallbacks
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "nexus_store",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test DB Connection on application startup
(async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ Connected to MySQL Database Pool");
    conn.release();
  } catch (err) {
    console.error("❌ Database Connection Error:", err.message);
  }
})();

module.exports = db;