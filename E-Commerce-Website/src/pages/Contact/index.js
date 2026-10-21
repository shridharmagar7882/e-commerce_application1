import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import "./style.css";

// Ensure this matches your backend server URL
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Protect against HTML responses (404s, Server Error pages)
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          `Server returned non-JSON response (Status ${response.status}). Make sure backend is running on ${API_URL}`
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit message.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 contactSection">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Contact Us</h2>
        <p className="text-muted">
          Have a question about your order or our products? We’re here to help!
        </p>
      </div>

      <Row className="g-4">
        {/* Left Column: Contact Info Cards */}
        <Col lg={4}>
          <div className="d-flex flex-column gap-3">
            <Card className="border-0 shadow-sm p-3">
              <Card.Body>
                <h6 className="fw-bold text-primary mb-2">Location</h6>
                <p className="text-muted mb-0">
                  Station Road, Near Bus Stand,<br />
                  Kolhapur, Maharashtra - 416001
                </p>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm p-3">
              <Card.Body>
                <h6 className="fw-bold text-primary mb-2">Email & Phone</h6>
                <p className="text-muted mb-1">
                  <strong>Email:</strong> support@Kolhapurstore.com
                </p>
                <p className="text-muted mb-0">
                  <strong>Phone:</strong> +91 987654321
                </p>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm p-3">
              <Card.Body>
                <h6 className="fw-bold text-primary mb-2">Store Hours</h6>
                <p className="text-muted mb-1">Mon - Sat: 9:30 AM - 9:00 PM</p>
                <p className="text-muted mb-0">Sunday: 10:00 AM - 6:00 PM</p>
              </Card.Body>
            </Card>
          </div>
        </Col>

        {/* Right Column: Contact Form */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm p-4">
            <Card.Body>
              <h4 className="fw-bold mb-4">Send Us a Message</h4>

              {submitted && (
                <Alert
                  variant="success"
                  onClose={() => setSubmitted(false)}
                  dismissible
                >
                  Thank you! Your message has been saved. We will get back to you shortly.
                </Alert>
              )}

              {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="contactName">
                      <Form.Label className="fw-semibold">Your Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="contactEmail">
                      <Form.Label className="fw-semibold">Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group controlId="contactSubject">
                      <Form.Label className="fw-semibold">Subject</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Order status, product inquiry, etc."
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group controlId="contactMessage">
                      <Form.Label className="fw-semibold">Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message here..."
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="px-4 mt-2"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Google Map Section */}
      <Row className="mt-5">
        <Col>
          <Card className="border-0 shadow-sm overflow-hidden">
            <iframe
              title="Kolhapur Store Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61159.20658763529!2d74.2043834!3d16.7049873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1000cdec07a29%3A0xece8ea64d008f81f!2sKolhapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}