import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import { ShoppingBag, ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Local image imports
import fashion1 from "../../assets/image/Fashion1.jpeg";
import fashion2 from "../../assets/image/Fashion2.jpeg";
import elec1 from "../../assets/image/electronic1.jpeg";
import elec2 from "../../assets/image/electronic2.jpeg";
import elec3 from "../../assets/image/electronic3.jpeg";
import elec4 from "../../assets/image/electronic4.jpeg";
import show1 from "../../assets/image/shows1.jpeg";
import show2 from "../../assets/image/shows2.jpeg";
import show3 from "../../assets/image/shows3.jpeg";
import sports1 from "../../assets/image/sports1.jpeg";
import sports2 from "../../assets/image/sports2.jpeg";
import sports3 from "../../assets/image/sports3.jpeg";

import slideBanner1 from "../../assets/image/slideBanner1.jpg";
import banner1 from "../../assets/image/banner1.jpg";
import banner2 from "../../assets/image/banner2.jpg";
import banner3 from "../../assets/image/banner3.jpg";
import banner4 from "../../assets/image/banner4.jpg";

const assets = {
  heroBanners: [slideBanner1, banner1, banner2, banner3, banner4],
};

const CATEGORIES = [
  {
    title: "Fashion",
    products: [
      { id: 1, name: "Fashion Dress", price: 49.99, image: fashion1, category: "Fashion" },
      { id: 2, name: "Fashion Jacket", price: 59.99, image: fashion2, category: "Fashion" },
    ],
  },
  {
    title: "Electronics",
    products: [
      { id: 3, name: "Laptop", price: 799.99, image: elec1, category: "Electronics" },
      { id: 4, name: "Smart Phone", price: 599.99, image: elec2, category: "Electronics" },
      { id: 5, name: "Headphones", price: 99.99, image: elec3, category: "Electronics" },
      { id: 6, name: "Smart Watch", price: 149.99, image: elec4, category: "Electronics" },
    ],
  },
  {
    title: "Footwear",
    products: [
      { id: 7, name: "Running Shoes", price: 89.99, image: show1, category: "Footwear" },
      { id: 8, name: "Sneakers", price: 69.99, image: show2, category: "Footwear" },
      { id: 9, name: "Sports Shoes", price: 79.99, image: show3, category: "Footwear" },
    ],
  },
  {
    title: "Sports",
    products: [
      { id: 10, name: "Football", price: 29.99, image: sports1, category: "Sports" },
      { id: 11, name: "Cricket Bat", price: 79.99, image: sports2, category: "Sports" },
      { id: 12, name: "Tennis Kit", price: 99.99, image: sports3, category: "Sports" },
    ],
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export default function Homepage() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const currentSlide = Math.abs(page % assets.heroBanners.length);

  const paginate = useCallback((newDirection) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  const addToCart = (product) => {
    setCart((prev) => {
      const match = prev.find((item) => item.id === product.id);
      return match
        ? prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item))
        : [...prev, { ...product, qty: 1 }];
    });
  };

  const checkoutSingle = (product) => {
    navigate("/bill", { state: { items: [{ ...product, qty: 1 }], isBuyNow: true } });
  };

  const checkoutCart = () => {
    navigate("/bill", { state: { items: cart, isBuyNow: false } });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const allProducts = CATEGORIES.flatMap((cat) => cat.products);

  return (
    <div className="contentWrapper py-3" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <div className="container">
        
        {/* Header Navigation */}
        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
          <div onClick={() => navigate("/")} className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
            <h3 className="fw-bold mb-0 fs-4" style={{ color: "#233a95" }}>
              Kolhapur <span className="text-secondary">.STORE</span>
            </h3>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Button variant="outline-primary" size="sm" onClick={() => navigate("/shop")} className="fw-semibold px-3 py-1 fs-6">
              Full Shop Page
            </Button>

            <motion.div
              key={totalItems}
              animate={{ scale: [1, 1.05, 1] }}
              onClick={cart.length > 0 ? checkoutCart : () => navigate("/shop")}
              className="badge bg-white text-primary p-2 border border-primary fs-6 shadow-sm d-flex align-items-center gap-2"
              style={{ cursor: "pointer" }}
            >
              <ShoppingBag className="w-4 h-4 text-primary" />
              <span>Cart ({totalItems})</span>
            </motion.div>
          </div>
        </div>

        {/* Hero Banner Section */}
        <div className="w-100 mb-4">
          <div
            style={{
              height: "380px",
              width: "100%",
              position: "relative",
              borderRadius: "14px",
              overflow: "hidden",
              backgroundColor: "#111827",
            }}
            className="shadow-sm"
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 28 },
                  opacity: { duration: 0.6 },
                }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                }}
              >
                <img
                  src={assets.heroBanners[currentSlide]}
                  alt={`Banner ${currentSlide + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                
                {/* Text Overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.1) 100%)",
                    paddingLeft: "6%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h2 className="fw-bold text-white mb-3 fs-2">
                      Discover Top Products <br /> & Exclusive Deals
                    </h2>
                    <Button
                      variant="primary"
                      className="fw-bold px-4 py-2 shadow border-0"
                      style={{ backgroundColor: "#233a95" }}
                      onClick={() => navigate("/shop")}
                    >
                      Explore Marketplace ➔
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Left Button */}
            <button
              onClick={() => paginate(-1)}
              style={{
                position: "absolute",
                top: "50%",
                left: "16px",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right Button */}
            <button
              onClick={() => paginate(1)}
              style={{
                position: "absolute",
                top: "50%",
                right: "16px",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Featured Products */}
        <div className="w-100">
          <h4 className="mb-3 fw-bold border-start border-4 border-primary ps-2 fs-5" style={{ color: "#233a95" }}>
            Featured Products
          </h4>
          <div className="row g-3">
            {allProducts.slice(0, 8).map((prod) => (
              <div className="col-xl-3 col-lg-3 col-md-4 col-6" key={prod.id}>
                <motion.div
                  className="card h-100 bg-white shadow-sm border rounded-3 overflow-hidden"
                  whileHover={{ y: -4 }}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    style={{
                      height: "160px",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      padding: "8px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                    />
                  </div>

                  <div className="card-body p-2 text-center d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="fw-semibold text-dark mb-1 text-truncate">{prod.name}</h6>
                      <p className="fw-bold fs-6 mb-2" style={{ color: "#233a95" }}>
                        ${prod.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="d-flex flex-column gap-1">
                      <Button variant="outline-primary" className="w-100 fw-semibold py-1 fs-7" size="sm" onClick={() => addToCart(prod)}>
                        Add to Cart
                      </Button>
                      <Button variant="success" className="w-100 fw-bold py-1 fs-7 shadow-sm" size="sm" onClick={() => checkoutSingle(prod)}>
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}