const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Register Route
router.post("/register", (req, res) => {
  const name = req.body.name || req.body.username;
  const { email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const result = db
      .prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
      .run(name, email, password);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: result.lastInsertRowid,
    });
  } catch (err) {
    console.error("Database Registration Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login Route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = db
      .prepare("SELECT id, name, email FROM users WHERE email = ? AND password = ?")
      .get(email, password);

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    res.json({ success: true, message: "Login successful", user });
  } catch (err) {
    console.error("Database Login Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;