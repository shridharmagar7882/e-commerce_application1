const express = require("express");
const router = express.Router();
const db = require("../config/db");
// Store Contact Form Message
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  try {
    const sql = "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)";
    const [result] = await db.query(sql, [name, email, subject, message]);
    res.status(201).json({ success: true, message: "Message saved successfully", id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to store contact message" });
  }
});
module.exports = router;
