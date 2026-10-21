const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Your MySQL pool connection

// Get Analytics Overview
router.get('/analytics/overview', async (req, res) => {
  try {
    // Total Revenue & Total Orders
    const [salesResult] = await db.query(
      `SELECT COUNT(*) as totalOrders, COALESCE(SUM(total_amount), 0) as totalRevenue 
       FROM orders WHERE status = 'Delivered'`
    );

    // Low Stock Inventory Warning (Threshold <= 10)
    const [inventoryResult] = await db.query(
      `SELECT COUNT(*) as lowStockCount FROM products WHERE stock_quantity <= 10`
    );

    // Monthly Sales Breakdown for Charts
    const [monthlySales] = await db.query(
      `SELECT DATE_FORMAT(created_at, '%Y-%m') as month, SUM(total_amount) as revenue 
       FROM orders WHERE status = 'Delivered' 
       GROUP BY month ORDER BY month ASC LIMIT 6`
    );

    res.json({
      success: true,
      stats: {
        totalRevenue: salesResult[0].totalRevenue,
        totalOrders: salesResult[0].totalOrders,
        lowStockItems: inventoryResult[0].lowStockCount,
      },
      chartData: monthlySales
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;