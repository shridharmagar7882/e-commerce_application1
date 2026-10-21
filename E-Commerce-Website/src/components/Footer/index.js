import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { LuMilk, LuTruck, LuBadgePercent, LuDollarSign } from 'react-icons/lu';
import { IoMailOutline } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="footer bg-white border-top mt-5">
      {/* 1. Value Proposition Banner */}
      <div className="container py-4 border-bottom">
        <div className="row text-center text-md-start g-4">
          <div className="col-12 col-sm-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start">
            <LuMilk className="fs-1 text-primary me-3 flex-shrink-0" />
            <div>
              <h6 className="fw-bold mb-0">Everyday Fresh Products</h6>
              <small className="text-muted">Direct from local farms</small>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start">
            <LuTruck className="fs-1 text-primary me-3 flex-shrink-0" />
            <div>
              <h6 className="fw-bold mb-0">Free Delivery</h6>
              <small className="text-muted">For orders over ₹499</small>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start">
            <LuBadgePercent className="fs-1 text-primary me-3 flex-shrink-0" />
            <div>
              <h6 className="fw-bold mb-0">Daily Mega Discounts</h6>
              <small className="text-muted">Save big on groceries</small>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start">
            <LuDollarSign className="fs-1 text-primary me-3 flex-shrink-0" />
            <div>
              <h6 className="fw-bold mb-0">Best Price Guaranteed</h6>
              <small className="text-muted">Quality at lower prices</small>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Link Columns & Newsletter */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-md-3">
            <h6 className="fw-bold mb-3">FRUIT & VEGETABLES</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/shop" className="text-secondary text-decoration-none">Fresh Vegetables</Link></li>
              <li><Link to="/shop" className="text-secondary text-decoration-none">Herbs & Seasonings</Link></li>
              <li><Link to="/shop" className="text-secondary text-decoration-none">Fresh Fruits</Link></li>
              <li><Link to="/shop" className="text-secondary text-decoration-none">Cuts & Sprouts</Link></li>
              <li><Link to="/shop" className="text-secondary text-decoration-none">Exotic Fruits & Veggies</Link></li>
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <h6 className="fw-bold mb-3">BREAKFAST & DAIRY</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/shop" className="text-secondary text-decoration-none">Milk & Flavoured Milk</Link></li>
              <li><Link to="/shop" className="text-secondary text-decoration-none">Butter and Margarine</Link></li>
              <li><Link to="/shop" className="text-secondary text-decoration-none">Cheese & Paneer</Link></li>
              <li><Link to="/shop" className="text-secondary text-decoration-none">Eggs & Poultry</Link></li>
              <li><Link to="/shop" className="text-secondary text-decoration-none">Yogurt & Shrikhand</Link></li>
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <h6 className="fw-bold mb-3">CUSTOMER SERVICE</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/contact" className="text-secondary text-decoration-none">Contact Us</Link></li>
              <li><Link to="/about" className="text-secondary text-decoration-none">About Us</Link></li>
              <li><Link to="/faq" className="text-secondary text-decoration-none">Help & FAQs</Link></li>
              <li><Link to="/privacy" className="text-secondary text-decoration-none">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-secondary text-decoration-none">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <h6 className="fw-bold mb-3">JOIN OUR NEWSLETTER</h6>
            <p className="small text-muted mb-3">Subscribe to get special offers, free giveaways, and deals.</p>
            <form onSubmit={(e) => e.preventDefault()} className="position-relative">
              <input 
                type="email" 
                className="form-control pe-5 py-2 text-dark small" 
                placeholder="Your Email Address..." 
                required 
              />
              <Button 
                type="submit" 
                className="position-absolute end-0 top-0 bottom-0 text-primary min-width-auto px-3"
              >
                <IoMailOutline className="fs-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Bottom Copyright Bar */}
      <div className="bg-light py-3 border-top">
        <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-center text-muted small">
          <p className="mb-2 mb-sm-0">Copyright © 2026 Store. All rights reserved.</p>
          <div className="d-flex gap-3">
            <Link to="/privacy" className="text-muted text-decoration-none">Privacy</Link>
            <Link to="/terms" className="text-muted text-decoration-none">Terms</Link>
            <Link to="/sitemap" className="text-muted text-decoration-none">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;