



"use client";

import React, { useState, useEffect, useRef } from "react";
import account from "../assets/user.png";
import logo from "../assets/LogoWhite.png";
import cart from "../assets/cart.png";
import search from "../assets/find.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { Logout } from "./Allapi"; 

export const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu state

  const popupRef = useRef(null);
  const navigate = useNavigate();

  // Hide / Show header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close popup when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (showPopup && popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [showPopup]);

  // Close mobile on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setShowPopup(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Account click
  const handleAccountClick = (e) => {
    // prevent mobile menu toggle or other propagation if needed
    e?.stopPropagation();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setShowPopup((v) => !v);
    setSelectedSection(null);
  };

  const handleClickOrders = () => {
    setShowPopup(false);
    navigate("/orderlist");
  };
  const handleClickProfile = () => {
    setShowPopup(false);
    navigate("/profile");
  };

  const handleMobileNavClick = (action) => {
    // action: 'home' | 'review' | 'contact'
    setMobileOpen(false);
    if (action === "home") navigate("/");
    if (action === "review") navigate("/review");
    if (action === "contact") {
      // smooth scroll to footer if on same page
      document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  
  // 🔹 Logout using backend API
  const handleLogout = async () => {
  try {
    await Logout(); // call your API

    // Clear frontend storage
     // keep guest local cart; clear auth & merge flag
    const user = JSON.parse(localStorage.getItem("user"));
    const mergeKey = user ? `cartMerged_${user._id}` : null;

    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    if (mergeKey) localStorage.removeItem(mergeKey);

    // notify
    window.dispatchEvent(new Event("userChanged"));


    setMobileOpen(false)
    setShowPopup(false);

    navigate("/login");
    console.log("✅ Logout successful");
  } catch (err) {
    console.error("❌ Logout failed:", err);
  }
};

  return (
    <div>
      <header className={`main-header ${showHeader ? "show" : "hide"}`}>
        <div className="logo">
          <img src={logo || "/placeholder.svg"} alt="Logo" />
        </div>

        <nav className="menu" aria-label="Main">
          <a href="/" onClick={(e) => e.currentTarget.blur()}>Home</a>
          <a href="/review" onClick={(e) => e.currentTarget.blur()}>Review</a>
          <a
            onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}
            style={{ cursor: "pointer" }}
          >
            Contact Us
          </a>
        </nav>

        <div className="search-icon">
          <input type="search" placeholder="Search..." />
          <img src={search || "/placeholder.svg"} alt="Search" />
        </div>

        {/* Account Icon */}
        <div className="account" onClick={handleAccountClick} role="button" aria-label="Account">
          <img src={account || "/placeholder.svg"} alt="Account" />
        </div>

        {/* Cart Icon */}
        <div className="cart" onClick={() => navigate("/cart")} role="button" aria-label="Cart">
          <img src={cart || "/placeholder.svg"} alt="Cart" />
        </div>

        {/* Hamburger Button */}
        <button
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Popup (account) - uses popupRef and closes when clicking outside */}
      {showPopup && (
        <div
          ref={popupRef}
          className={`popup-card ${selectedSection ? "expanded" : ""}`}
          role="dialog"
          aria-modal="false"
        >
          {!selectedSection ? (
            <>
              <button onClick={handleClickProfile}>Profile</button>
              <button onClick={handleClickOrders}>My Order</button>
              <button onClick={() => setSelectedSection("settings")}>Settings</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <div className="popup-content">
              {selectedSection === "settings" && (
                <div>
                  <h3>⚙️ Settings</h3>
                  <p>Show settings here...</p>
                </div>
              )}
              <button className="back-btn" onClick={() => setSelectedSection(null)}>
                ⬅ Back
              </button>
            </div>
          )}
        </div>
      )}

      {/* Backdrop for mobile menu */}
      {mobileOpen && <div className="backdrop" onClick={() => setMobileOpen(false)} aria-hidden="true" />}

      {/* Mobile Menu includes search + full nav */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${mobileOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="mobile-inner">
          <div className="mobile-search">
            <input placeholder="Search..." />
            <img src={search || "/placeholder.svg"} alt="Search" />
          </div>

          <div className="mobile-actions">
            <button className="mobile-action" onClick={() => handleMobileNavClick("home")}>Home</button>
            <button className="mobile-action" onClick={() => handleMobileNavClick("review")}>Review</button>
            <button className="mobile-action" onClick={() => handleMobileNavClick("contact")}>Contact Us</button>

            <hr />

            <button
              className="mobile-action"
              onClick={() => {
                const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
                if (!isLoggedIn) navigate("/login");
                else {
                  setShowPopup(true);
                  setSelectedSection(null);
                }
                setMobileOpen(false);
              }}
            >
              <img src={account || "/placeholder.svg"} alt="Account" />
              <span>Account</span>
            </button>

            <button
              className="mobile-action"
              onClick={() => {
                navigate("/cart");
                setMobileOpen(false);
              }}
            >
              <img src={cart || "/placeholder.svg"} alt="Cart" />
              <span>Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
