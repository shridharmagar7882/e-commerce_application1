import React, { useState } from 'react';

const STATUS_STEPS = ['Pending', 'Processing', 'Shipped', 'Delivered'];

const OrderTracker = () => {
  const [searchId, setSearchId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const response = await fetch(`http://localhost:5000/api/orders/track/${searchId.trim()}`);
      const data = await response.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        setError(data.message || 'Order not found');
      }
    } catch (err) {
      setError('Failed to fetch order details. Ensure server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate current progress bar percentage
  const getStepIndex = (status) => STATUS_STEPS.indexOf(status);
  const currentStep = order ? getStepIndex(order.status) : 0;
  const progressPercent = ((currentStep) / (STATUS_STEPS.length - 1)) * 100;

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <div className="card shadow-sm p-4">
        <h3 className="text-center mb-4">Track Your Order</h3>

        {/* Search Input */}
        <form onSubmit={handleTrack} className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Order ID or Tracking Number"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              required
            />
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Track'}
            </button>
          </div>
        </form>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Order Details & Visual Step Tracker */}
        {order && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5>Order #{order.id}</h5>
                <small className="text-muted">Tracking: {order.trackingNumber || 'N/A'}</small>
              </div>
              <span className="badge bg-primary fs-6">{order.status}</span>
            </div>

            {/* Visual Step Progress Bar */}
            <div className="position-relative my-4">
              <div className="progress" style={{ height: '4px' }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="d-flex justify-content-between position-relative mt-n3" style={{ marginTop: '-14px' }}>
                {STATUS_STEPS.map((step, idx) => {
                  const isCompleted = idx <= currentStep;
                  return (
                    <div key={step} className="text-center">
                      <div
                        className={`rounded-circle d-inline-flex align-items-center justify-content-center text-white ${
                          isCompleted ? 'bg-success' : 'bg-secondary'
                        }`}
                        style={{ width: '28px', height: '28px', fontSize: '12px' }}
                      >
                        {isCompleted ? '✓' : idx + 1}
                      </div>
                      <div className="small mt-1 font-weight-bold">{step}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Updates History Timeline */}
            <h6 className="mt-4 mb-3">Tracking History</h6>
            <ul className="list-group list-group-flush">
              {order.timeline && order.timeline.length > 0 ? (
                order.timeline.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                    <div>
                      <strong>{item.status}</strong> - {item.message}
                    </div>
                    <small className="text-muted">
                      {new Date(item.updated_at).toLocaleString()}
                    </small>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-muted">No timeline updates recorded yet.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracker;