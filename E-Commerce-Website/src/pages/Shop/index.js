import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

// Dynamic image loading context from assets/image
let imagesContext;
try {
  imagesContext = require.context('../../assets/image', false, /\.(png|jpe?g|svg)$/);
} catch (e) {
  console.warn('Assets context missing:', e);
}

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cart & Toast state
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Search & Filter state
  // 1. Initialize search query directly from URL parameter
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchProducts();
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  // 2. Sync internal state whenever the URL search parameter updates (e.g., Header Search submit)
  useEffect(() => {
    const queryFromUrl = searchParams.get('search') || '';
    setSearchQuery(queryFromUrl);
  }, [searchParams]);

  // Quick Trick: Auto-add product via URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const addName = params.get('add_name');
    const addPrice = params.get('add_price');
    const addImg = params.get('add_img');

    if (addName && addPrice) {
      const newProduct = {
        id: Date.now(),
        name: addName,
        price: addPrice,
        image: addImg || 'electronic1.jpeg',
        category: 'Custom',
        description: 'Product added dynamically via URL.'
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
  }, [location.search]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      if (data.success) {
        setProducts(data.products || []);
      } else {
        setError(data.message || 'Failed to retrieve products');
      }
    } catch (err) {
      console.error(err);
      setError('Cannot connect to backend server on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const getProductImage = (imageName) => {
    if (!imageName) return 'https://via.placeholder.com/250?text=No+Image';
    const cleanName = imageName.split('/').pop().trim();
    try {
      if (imagesContext) return imagesContext(`./${cleanName}`);
    } catch (err) {}
    return 'https://via.placeholder.com/250?text=Image+Not+Found';
  };

  const handleAddToCart = (product) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item.id === product.id);

    if (index > -1) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    setToastMessage(`🛒 Added "${product.name}" to cart!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleBuyNow = (product) => {
    handleAddToCart(product);
    navigate('/billing');
  };

  // 3. Update URL when typing directly in the Shop page's input box
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val) {
      setSearchParams({ search: val });
    } else {
      setSearchParams({});
    }
  };

  // Filter Calculation
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase().trim());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container-fluid p-4 position-relative">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div 
          className="position-fixed top-0 end-0 m-4 p-3 bg-success text-white rounded shadow-lg"
          style={{ zIndex: 9999 }}
        >
          {toastMessage}
        </div>
      )}

      {/* Top Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Store Products</h3>
        <button 
          className="btn btn-primary position-relative"
          onClick={() => navigate('/billing')}
        >
          🛒 View Cart & Billing
          {cart.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cart.reduce((a, c) => a + c.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Search & Filter Control Bar */}
      <div className="row g-2 mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="⚡ Search products by name..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-4">
          <select 
            className="form-select shadow-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Grocery">Grocery</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
      </div>

      {/* Active Search Indicator */}
      {searchQuery && (
        <div className="mb-3 d-flex align-items-center justify-content-between alert alert-light border">
          <span>
            Showing results for: <strong>"{searchQuery}"</strong>
          </span>
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={() => handleSearchChange({ target: { value: '' } })}
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Fetching items...</p>
        </div>
      )}

      {/* Connection Error Alert */}
      {error && (
        <div className="alert alert-danger p-3 shadow-sm mb-4">
          <h5 className="alert-heading fw-bold">Backend Warning</h5>
          <p className="mb-0">{error}</p>
        </div>
      )}

      {/* Product List */}
      {!loading && (
        <div className="row g-4">
          {filteredProducts.length === 0 ? (
            <div className="col-12 text-center py-5 text-muted">
              <h5>No products found matching your search.</h5>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id || product.item_id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card shadow-sm h-100">
                  
                  <div className="position-relative overflow-hidden" style={{ height: '200px', backgroundColor: '#f8f9fa' }}>
                    <img
                      src={getProductImage(product.image)}
                      className="card-img-top w-100 h-100"
                      alt={product.name}
                      style={{ objectFit: 'contain', padding: '10px' }}
                    />
                    {product.category && (
                      <span className="badge bg-info text-dark position-absolute top-0 start-0 m-2">
                        {product.category}
                      </span>
                    )}
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h6 className="fw-bold text-dark mb-1">{product.name}</h6>
                    <p className="text-muted small flex-grow-1">
                      {product.description || 'No detailed description available.'}
                    </p>
                    
                    <div className="mt-2 pt-2 border-top">
                      <div className="fw-bold text-primary fs-5 mb-2">
                        ₹{parseFloat(product.price || 0).toFixed(2)}
                      </div>
                      
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-outline-primary btn-sm w-50"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </button>
                        <button 
                          className="btn btn-primary btn-sm w-50"
                          onClick={() => handleBuyNow(product)}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};

export default Shop;