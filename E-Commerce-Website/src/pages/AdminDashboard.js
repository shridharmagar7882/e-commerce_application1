import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({ totalRevenue: 0, totalOrders: 0, lowStockItems: 0 });
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/analytics/overview')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMetrics(data.stats);
          
          // Prepare Chart Data
          const months = data.chartData.map((d) => d.month);
          const revenues = data.chartData.map((d) => d.revenue);

          setChartData({
            labels: months,
            datasets: [
              {
                label: 'Monthly Sales Revenue (₹)',
                data: revenues,
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                fill: true,
              },
            ],
          });
        }
      });
  }, []);

  return (
    <Container className="py-4">
      <h3 className="fw-bold mb-4">Admin Analytics Dashboard</h3>

      {/* Overview Cards */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="p-3 shadow-sm border-0 border-start border-primary border-4">
            <h6 className="text-muted">Total Revenue</h6>
            <h3 className="fw-bold text-primary">₹{metrics.totalRevenue}</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow-sm border-0 border-start border-success border-4">
            <h6 className="text-muted">Completed Orders</h6>
            <h3 className="fw-bold text-success">{metrics.totalOrders}</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow-sm border-0 border-start border-warning border-4">
            <h6 className="text-muted">Low Stock Warnings</h6>
            <h3 className="fw-bold text-warning">{metrics.lowStockItems} Items</h3>
          </Card>
        </Col>
      </Row>

      {/* Sales Trend Chart */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="p-3 shadow-sm border-0">
            <h5 className="fw-bold mb-3">Revenue Analytics</h5>
            {chartData.labels ? <Line data={chartData} /> : <p>Loading chart...</p>}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;