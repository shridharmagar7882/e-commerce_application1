import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Imported function directly

const Bill = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get items passed via navigate state or fallback to local storage
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    const passedItems = location.state?.items;
    if (passedItems && passedItems.length > 0) {
      setCheckoutItems(passedItems);
    } else {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCheckoutItems(savedCart);
    }
  }, [location.state]);

  // Customer Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    gateway: "Cash on Delivery",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Remove an individual item from checkout list and sync with local storage
  const handleRemoveItem = (indexToRemove) => {
    const updatedItems = checkoutItems.filter((_, idx) => idx !== indexToRemove);
    setCheckoutItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  // Calculations
  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + parseFloat(item.price || 0) * (item.qty || item.quantity || 1),
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Invoice Header
    doc.setFontSize(18);
    doc.text("Order Invoice", 15, 20);

    // Customer Info
    doc.setFontSize(11);
    doc.text(`Customer Name : ${form.name || "N/A"}`, 15, 32);
    doc.text(`Email Address : ${form.email || "N/A"}`, 15, 39);
    doc.text(`Address       : ${form.address || "N/A"}`, 15, 46);
    doc.text(`Payment Method: ${form.gateway}`, 15, 53);

    // Items Table
    const rows = checkoutItems.map((item) => [
      item.name,
      item.qty || item.quantity || 1,
      `INR ${parseFloat(item.price).toFixed(2)}`,
      `INR ${(parseFloat(item.price) * (item.qty || item.quantity || 1)).toFixed(2)}`,
    ]);

    // Use autoTable(doc, options) instead of doc.autoTable(...)
    autoTable(doc, {
      startY: 60,
      head: [["Product", "Qty", "Price", "Total"]],
      body: rows,
    });

    // Retrieve ending Y post-table position safely
    const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 120;
    const y = finalY + 10;

    // Totals Section
    doc.text(`Subtotal : INR ${subtotal.toFixed(2)}`, 140, y);
    doc.text(`Tax (8%) : INR ${tax.toFixed(2)}`, 140, y + 8);
    doc.setFontSize(12);
    doc.text(`Grand Total : INR ${total.toFixed(2)}`, 140, y + 16);

    doc.save("Invoice.pdf");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkoutItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      generatePDF();
      localStorage.removeItem("cart");
    }, 1200);
  };

  if (checkoutItems.length === 0 && !success) {
    return (
      <div className="container py-5 text-center">
        <h3 className="mb-3">No Items Found in Cart</h3>
        <Button variant="primary" onClick={() => navigate("/shop")}>
          Back to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Card className="shadow p-4">
        {success ? (
          <div className="text-center py-4">
            <h2 className="text-success mb-3">🎉 Order Placed Successfully!</h2>
            <p className="text-muted">Your official PDF Invoice has been generated and downloaded.</p>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button variant="outline-primary" onClick={generatePDF}>
                Re-download PDF
              </Button>
              <Button variant="primary" onClick={() => navigate("/shop")}>
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="mb-4 text-center fw-bold">Checkout & Invoice</h2>

            <Form onSubmit={handleSubmit}>
              <Row>
                {/* Billing Details */}
                <Col md={7}>
                  <h5 className="fw-bold mb-3">1. Billing & Shipping Info</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Shipping Address *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      placeholder="Street, City, Pincode"
                    />
                  </Form.Group>

                  {/* Payment Method Selection */}
                  <h5 className="fw-bold mt-4 mb-3">2. Payment Option</h5>
                  <Form.Group className="mb-3">
                    <Form.Select
                      name="gateway"
                      value={form.gateway}
                      onChange={handleChange}
                    >
                      <option>Cash on Delivery</option>
                      <option>UPI / Net Banking</option>
                      <option>Online Wallet</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Order Summary & Actions */}
                <Col md={5}>
                  <Card className="p-3 bg-light border-0">
                    <h5 className="fw-bold mb-3">Order Summary</h5>

                    {checkoutItems.map((item, idx) => (
                      <div
                        key={item.id || idx}
                        className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom"
                      >
                        <div>
                          <span className="fw-medium">{item.name}</span>
                          <span className="text-muted ms-1">
                            × {item.qty || item.quantity || 1}
                          </span>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <span className="fw-bold">
                            ₹{(parseFloat(item.price) * (item.qty || item.quantity || 1)).toFixed(2)}
                          </span>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="py-0 px-2 fs-6"
                            title="Remove item"
                            onClick={() => handleRemoveItem(idx)}
                          >
                            ✕
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="d-flex justify-content-between mb-1 mt-3">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span>Tax (8%)</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>

                    <div className="d-flex justify-content-between fs-4 fw-bold mt-2">
                      <span>Total</span>
                      <span className="text-primary">₹{total.toFixed(2)}</span>
                    </div>

                    {/* PDF Preview Button */}
                    <Button
                      variant="outline-secondary"
                      className="w-100 mt-4 mb-2"
                      onClick={generatePDF}
                    >
                      Download Invoice PDF Preview
                    </Button>

                    <Button
                      type="submit"
                      variant="success"
                      size="lg"
                      className="w-100 shadow-sm"
                      disabled={loading}
                    >
                      {loading ? "Processing Order..." : "Place Order & Get PDF"}
                    </Button>
                  </Card>
                </Col>
              </Row>
            </Form>
          </>
        )}
      </Card>
    </div>
  );
};

export default Bill;