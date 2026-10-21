import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Badge, Drawer, IconButton, Tooltip } from '@mui/material';
import { IoMdSearch, IoMdClose, IoMdTrash } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import CountryDropdown from '../CountryDropdown';
import logo from '../../assets/image/logo.png';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart State
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Fresh Organic Apples', price: 120, quantity: 2, category: 'Fruits' },
    { id: 2, name: 'Pure Milk 1L', price: 60, quantity: 1, category: 'Dairy' }
  ]);

  const searchRef = useRef(null);
  const navigate = useNavigate();

  const mockProducts = [
    'Organic Bananas', 'Fresh Apples', 'Pure Milk 1L', 'Brown Bread', 
    'Green Tea', 'Craft Beer', 'Greek Yogurt', 'Dark Chocolate'
  ];

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setShowSuggestions(false);
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim().length > 0) {
      const filtered = mockProducts.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (item) => {
    setSearchTerm(item);
    setShowSuggestions(false);
    navigate(`/shop?search=${encodeURIComponent(item)}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="headerWrapper border-bottom bg-white sticky-top">
      <header className="header py-2">
        <div className="container-fluid px-4">
          <div className="row align-items-center">
            
            {/* 1. Logo */}
            <div className="col-auto logoWrapper me-3">
              <Link to="/home">
                <img src={logo} alt="Logo" className="img-fluid" style={{ width: '140px', height: 'auto' }} />
              </Link>
            </div>

            {/* 2. Location Dropdown */}
            <div className="col-auto me-3">
              <CountryDropdown />
            </div>

            {/* 3. Search Bar */}
            <div className="col flex-grow-1 px-2" ref={searchRef} style={{ maxWidth: '480px' }}>
              <div className="position-relative w-100">
                <form 
                  onSubmit={handleSearch} 
                  className="headerSearch d-flex align-items-center bg-light rounded-2 px-3 border"
                  style={{ height: '44px' }}
                >
                  <input 
                    type="text" 
                    className="form-control border-0 bg-transparent shadow-none px-2 text-dark" 
                    placeholder="Search for products, categories..." 
                    autoComplete="off"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
                  />
                  {searchTerm && (
                    <IconButton size="small" onClick={() => { setSearchTerm(''); setShowSuggestions(false); }}>
                      <IoMdClose className="fs-6 text-muted" />
                    </IconButton>
                  )}
                  <Button className="searchBtn text-primary p-0 min-width-auto" type="submit">
                    <IoMdSearch className="fs-4" />
                  </Button>
                </form>

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="position-absolute start-0 end-0 bg-white shadow-lg rounded-3 mt-1 py-1 z-3 border">
                    {suggestions.map((item, index) => (
                      <div 
                        key={index} 
                        className="px-3 py-2 text-dark cursor-pointer hover-bg-light small d-flex align-items-center justify-content-between"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSelectSuggestion(item)}
                      >
                        <span><IoMdSearch className="me-2 text-muted" />{item}</span>
                        <span className="badge bg-light text-muted border">Product</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 4. Navigation Links & User/Cart Controls */}
            <div className="col-auto ms-auto d-flex align-items-center gap-4">
              <nav className="headerNav d-none d-lg-flex gap-3 align-items-center">
                <Link to="/home" className="text-dark fw-bold text-decoration-none px-1">
                  Home
                </Link>
                <Link to="/shop" className="text-dark fw-bold text-decoration-none px-1">
                  Shop
                </Link>
                <Link to="/contact" className="text-dark fw-bold text-decoration-none px-1">
                  Contact
                </Link>
                <Link to="/track-order" className="btn btn-outline-primary btn-sm fw-bold px-3">
                  Track Order
                </Link>
              </nav>

              {/* User Account */}
              <Tooltip title="Account">
                <Link to="/login">
                  <Button className="circle rounded-circle border p-2 min-width-auto text-dark">
                    <FiUser className="fs-5" />
                  </Button>
                </Link>
              </Tooltip>

              {/* Cart Info Trigger */}
              <div 
                className="cartTab d-flex align-items-center" 
                onClick={() => setIsCartOpen(true)} 
                style={{ cursor: 'pointer' }}
              >
                <span className="price fw-bold text-dark me-2">
                  ₹{totalAmount.toFixed(2)}
                </span>
                <Tooltip title="View Cart">
                  <Button className="circle rounded-circle border p-2 min-width-auto text-dark">
                    <Badge badgeContent={totalCount} color="primary" overlap="circular">
                      <IoBagOutline className="fs-5" />
                    </Badge>
                  </Button>
                </Tooltip>
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* Slide-out Cart Drawer */}
      <Drawer anchor="right" open={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <div className="p-4" style={{ width: '340px' }}>
          <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
            <h5 className="fw-bold mb-0">Shopping Cart ({totalCount})</h5>
            <IconButton onClick={() => setIsCartOpen(false)}>
              <IoMdClose />
            </IconButton>
          </div>

          <div className="cart-items-list py-3">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <div>
                    <h6 className="mb-0 small fw-bold">{item.name}</h6>
                    <span className="text-muted small">{item.quantity} x ₹{item.price}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold text-primary small">₹{item.quantity * item.price}</span>
                    <IconButton 
                      size="small" 
                      color="error" 
                      onClick={() => handleRemoveItem(item.id)}
                      title="Remove Item"
                    >
                      <IoMdTrash className="fs-5" />
                    </IconButton>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted text-center py-4">Your cart is empty.</p>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="pt-3 border-top mt-auto">
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Subtotal:</span>
                <span className="fw-bold text-primary">₹{totalAmount.toFixed(2)}</span>
              </div>
              <Button 
                variant="contained" 
                fullWidth 
                className="mb-2" 
                onClick={() => { setIsCartOpen(false); navigate('/cart'); }}
              >
                View Cart
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={() => { setIsCartOpen(false); navigate('/billing'); }}
              >
                Checkout
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Header;