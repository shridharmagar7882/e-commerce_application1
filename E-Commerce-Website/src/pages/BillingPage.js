import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BillingPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Billing Details State
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  // Saved Cards State
  const [savedCards, setSavedCards] = useState([
    { id: 1, cardHolder: 'Customer Name', cardNumber: '•••• •••• •••• 4242', expiry: '12/28', type: 'Visa' }
  ]);
  const [selectedCard, setSelectedCard] = useState(1);
  const [showAddCard, setShowAddCard] = useState(false);

  // New Card Form State
  const [newCard, setNewCard] = useState({
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(saved);
  }, []);

  const calculateSubtotal = () =>
    cartItems.reduce((acc, item) => acc + (parseFloat(item.price || 0) * (item.quantity || 1)), 0);

  const deliveryFee = calculateSubtotal() > 0 ? 50 : 0;
  const totalAmount = calculateSubtotal() + deliveryFee;

  const handleInputChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    if (!newCard.cardNumber || !newCard.expiry || !newCard.cvv) {
      alert('Please fill all card details.');
      return;
    }

    const last4 = newCard.cardNumber.slice(-4) || '1234';
    const cardObj = {
      id: Date.now(),
      cardHolder: newCard.cardHolder || 'Cardholder',
      cardNumber: `•••• •••• •••• ${last4}`,
      expiry: newCard.expiry,
      type: 'Debit/Credit'
    };

    setSavedCards([...savedCards, cardObj]);
    setSelectedCard(cardObj.id);
    setNewCard({ cardHolder: '', cardNumber: '', expiry: '', cvv: '' });
    setShowAddCard(false);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!billingInfo.fullName || !billingInfo.address || !billingInfo.phone) {
      alert('Please fill in required shipping fields.');
      return;
    }
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    alert(`🎉 Order placed successfully! Total Amount: ₹${totalAmount.toFixed(2)}`);
    localStorage.removeItem('cart');
    navigate('/shop');
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Checkout & Billing</h2>

      <div className="row g-4">
        {/* Shipping & Payment Options */}
        <div className="col-lg-8">
          
          {/* Shipping Info */}
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3">1. Delivery Address</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small text-muted">Full Name *</label>
                <input type="text" className="form-control" name="fullName" value={billingInfo.fullName} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Phone *</label>
                <input type="text" className="form-control" name="phone" value={billingInfo.phone} onChange={handleInputChange} required />
              </div>
              <div className="col-12">
                <label className="form-label small text-muted">Address *</label>
                <input type="text" className="form-control" name="address" value={billingInfo.address} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">City *</label>
                <input type="text" className="form-control" name="city" value={billingInfo.city} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Pincode *</label>
                <input type="text" className="form-control" name="pincode" value={billingInfo.pincode} onChange={handleInputChange} required />
              </div>
            </div>
          </div>

          {/* Payment & Card Section */}
          <div className="card shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">2. Payment Method</h5>
              <button 
                type="button" 
                className="btn btn-outline-primary btn-sm"
                onClick={() => setShowAddCard(!showAddCard)}
              >
                {showAddCard ? 'Cancel' : '+ Add New Card'}
              </button>
            </div>

            {/* Add New Card Form */}
            {showAddCard && (
              <form onSubmit={handleAddCardSubmit} className="bg-light p-3 rounded mb-4 border">
                <h6 className="fw-bold mb-3 text-primary">New Card Details</h6>
                <div className="row g-2">
                  <div className="col-12">
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      placeholder="Cardholder Name"
                      value={newCard.cardHolder}
                      onChange={(e) => setNewCard({ ...newCard, cardHolder: e.target.value })} 
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      placeholder="Card Number (16 Digits)"
                      maxLength="16"
                      value={newCard.cardNumber}
                      onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })} 
                      required
                    />
                  </div>
                  <div className="col-6">
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      placeholder="MM/YY"
                      maxLength="5"
                      value={newCard.expiry}
                      onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })} 
                      required
                    />
                  </div>
                  <div className="col-6">
                    <input 
                      type="password" 
                      className="form-control form-control-sm" 
                      placeholder="CVV"
                      maxLength="3"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })} 
                      required
                    />
                  </div>
                  <div className="col-12 mt-2">
                    <button type="submit" className="btn btn-success btn-sm w-100">Save & Use Card</button>
                  </div>
                </div>
              </form>
            )}

            {/* List of Saved Cards */}
            <div className="d-flex flex-column gap-2">
              {savedCards.map((card) => (
                <label 
                  key={card.id} 
                  className={`border rounded p-3 d-flex align-items-center justify-content-between ${selectedCard === card.id ? 'border-primary bg-light' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <input 
                      type="radio" 
                      name="paymentCard" 
                      checked={selectedCard === card.id} 
                      onChange={() => setSelectedCard(card.id)} 
                    />
                    <div>
                      <div className="fw-bold">{card.type} ({card.cardNumber})</div>
                      <div className="small text-muted">{card.cardHolder} | Exp: {card.expiry}</div>
                    </div>
                  </div>
                  <span className="badge bg-secondary">Saved</span>
                </label>
              ))}
            </div>

          </div>

        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm p-4 sticky-top" style={{ top: '20px' }}>
            <h5 className="fw-bold mb-3">Order Summary</h5>
            
            <div className="mb-3 border-bottom pb-3">
              {cartItems.length === 0 ? (
                <p className="text-muted small">Cart is empty.</p>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={item.id || idx} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small text-truncate me-2" style={{ maxWidth: '180px' }}>
                      {item.name} (x{item.quantity || 1})
                    </span>
                    <span className="fw-bold small">₹{(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Delivery Fee</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fs-5 fw-bold mb-4">
              <span>Total</span>
              <span className="text-primary">₹{totalAmount.toFixed(2)}</span>
            </div>

            <button onClick={handlePlaceOrder} className="btn btn-primary btn-lg w-100 shadow-sm">
              Place Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BillingPage;