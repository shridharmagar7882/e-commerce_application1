const express = require("express");
const router = express.Router();
const db = require("../database/db"); // now points to our SQLite db.js

// Get order details & tracking history
router.get("/track/:identifier", (req, res) => {
  const { identifier } = req.params;

  try {
    const order = db
      .prepare("SELECT * FROM orders WHERE id = ? OR tracking_number = ?")
      .get(identifier, identifier);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const updates = db
      .prepare(
        "SELECT status, message, updated_at FROM order_updates WHERE order_id = ? ORDER BY updated_at ASC"
      )
      .all(order.id);

    res.json({
      success: true,
      order: {
        id: order.id,
        status: order.status,
        trackingNumber: order.tracking_number,
        totalAmount: order.total_amount,
        createdAt: order.created_at,
        timeline: updates,
      },
    });
  } catch (err) {
    console.error("Order Tracking Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;