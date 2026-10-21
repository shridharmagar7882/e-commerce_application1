import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Badge, Spinner, Alert } from 'react-bootstrap';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Please log in to view your order history.');
      setLoading(false);
      return;
    }

    fetch('http://localhost:5000/api/orders/history', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders);
        } else {
          
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error('Order history fetch error:', err);
        setError('Failed to connect to backend server.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2">Loading your order history...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="warning">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4 fw-bold text-success">My Order History</h2>

      {orders.length === 0 ? (
        <Alert variant="info">You haven't placed any orders yet.</Alert>
      ) : (
        orders.map((order) => (
          <Card key={order.id} className="mb-4 shadow-sm border-0">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <div>
                <strong>Order #{order.id}</strong>
                <small className="text-muted ms-3">
                  {new Date(order.created_at).toLocaleDateString()} at{' '}
                  {new Date(order.created_at).toLocaleTimeString()}
                </small>
              </div>
              <div>
                <Badge bg={order.status === 'Completed' ? 'success' : 'primary'}>
                  {order.status || 'Pending'}
                </Badge>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive hover className="mb-0">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name || `Product ID: ${item.product_id}`}</td>
                      <td>₹{item.unit_price}</td>
                      <td>{item.quantity}</td>
                      <td>₹{(item.unit_price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer className="bg-white text-end">
              <span className="fs-5 fw-bold">
                Total: <span className="text-success">₹{order.total_amount}</span>
              </span>
            </Card.Footer>
          </Card>
        ))
      )}
    </Container>
  );
};

export default OrderHistory;