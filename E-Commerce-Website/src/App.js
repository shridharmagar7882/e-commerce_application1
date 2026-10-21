import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

// Page Components
import Homepage from "./pages/Home";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Bill from "./components/Bill";
import BillingPage from "./pages/BillingPage";
import OrderTracker from "./pages/OrderTracker"; 
import AdminOrders from "./pages/AdminOrders";

// Auth Components
import Login from "./pages/Login";
import Register from "./pages/Register";

function MainLayout() {
  const location = useLocation();

  // Hide Header, Footer, and Sidebar on Auth pages and root redirect
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      {/* Header */}
      {!isAuthPage && <Header />}

      {/* Main Content Area */}
      <div className="mainContent d-flex flex-grow-1">
        {!isAuthPage && <Sidebar />}

        <div className="contentWrapper flex-grow-1">
          <Routes>
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Store Routes */}
            <Route path="/home" element={<Homepage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bill" element={<Bill />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/track-order" element={<OrderTracker />} />

            {/* Admin Route */}
            <Route path="/admin/orders" element={<AdminOrders />} />

            {/* Fallback Catch-All */}
            <Route path="*" element={<Navigate to="/shop" replace />} />
          </Routes>
        </div>
      </div>

      {/* Footer */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <MainLayout />
    </Router>
  );
}

export default App;