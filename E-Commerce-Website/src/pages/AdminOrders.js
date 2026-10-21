import React, { useState } from 'react';
import { Container, Table, Badge, Button, Card } from 'react-bootstrap';

const AdminOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-1001',
      customer: 'John Doe',
      date: '2026-08-01',
      total: 300,
      status: 'Pending',
      items: 'Fresh Organic Apples (x2), Pure Milk 1L (x1)'
    },
    {
      id: 'ORD-1002',
      customer: 'Jane Smith',
      date: '2026-08-03',
      total: 180,
      status: 'Shipped',
      items: 'Organic Bananas (x3), Dark Chocolate (x1)'
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <Badge bg="warning" text="dark">Pending</Badge>;
      case 'Processing':
        return <Badge bg="info">Processing</Badge>;
      case 'Shipped':
        return <Badge bg="primary">Shipped</Badge>;
      case 'Delivered':
        return <Badge bg="success">Delivered</Badge>;
      case 'Cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white py-3">
          <h4 className="fw-bold mb-0">Admin - Manage Orders</h4>
        </Card.Header>
        <Card.Body>
          <Table responsive hover align="middle" className="mb-0">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="fw-bold">{order.id}</td>
                  <td>{order.customer}</td>
                  <td className="small text-muted">{order.date}</td>
                  <td className="small">{order.items}</td>
                  <td className="fw-bold">₹{order.total}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-success"
                      onClick={() => handleStatusChange(order.id, 'Delivered')}
                    >
                      Mark Delivered
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminOrders;