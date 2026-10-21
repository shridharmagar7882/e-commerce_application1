const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Get All Products
router.get("/", (req, res) => {
  try {
    const products = db.prepare("SELECT * FROM products").all();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
});

// Get Single Product by ID
router.get("/:id", (req, res) => {
  try {
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;