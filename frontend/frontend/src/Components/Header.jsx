



// import React, { useState, useEffect } from 'react';
// import account from '../assets/user.png';
// import logo from '../assets/LogoWhite.png';
// import cart from '../assets/cart.png';
// import search from '../assets/find.png';
// import './Header.css';
// import { useNavigate } from 'react-router-dom';


// export const Header = () => {
//   const [showHeader, setShowHeader] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedSection, setSelectedSection] = useState(null);


//   const navigate = useNavigate();

//   // 🔹 Hide / Show header on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       setShowHeader(window.scrollY <= lastScrollY);
//       setLastScrollY(window.scrollY);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [lastScrollY]);

//   // 🔹 When clicking account
//   const handleAccountClick = () => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; 
//     if (!isLoggedIn) {
//       navigate('/login');
//     } else {
//       setShowPopup(!showPopup);
//       setSelectedSection(null); // reset section
//     }
//   };

//   const handleClick=() =>{
//     navigate('/orderlist')
//   }
//   const handleSecClick=() =>{
//     navigate('/profile')
//   }

//   // 🔹 Logout using backend API
// //   // const handleLogout = async () => {
// //   //   try {
// //   //     await fetch("http://localhost:5000/auth/logout", {
// //   //       method: "POST",
// //   //       credentials: "include", // send cookies
// //   //     });

// //   //     localStorage.removeItem("isLoggedIn"); // clear frontend
// //   //     setIsLoggedIn(false);
// //   //     setShowPopup(false);

// //   //     navigate("/login");
// //   //   } catch (err) {
// //   //     console.error("Logout failed:", err);
// //   //   }
// //   // };

//   return (
//     <div>
//       <header className={`main-header ${showHeader ? 'show' : 'hide'}`}>
//         <div className="logo">
//           <img src={logo} alt="Logo" />
//         </div>

//         <div className="menu">
//           <a href="/">Home</a>
//           <a href="/review">Review</a>
          
//           <a onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}>
//   Contact Us
// </a>

//         </div>

//         <div className="search-icon">
//           <input type="search" />
//           <img src={search} alt="Search" />
//         </div>

//         {/* Account Icon */}
//         <div className="account" onClick={handleAccountClick}>
//           <img src={account} alt="Account" />
//         </div>

//         {/* Cart Icon */}
//         <div className="cart" onClick={() => navigate('/cart')}>
//           <img src={cart} alt="Cart" />
//         </div>
//       </header>

//       {/* ✅ Popup only if logged in */}
//       {showPopup && (
//         <div className={`popup-card ${selectedSection ? "expanded" : ""}`}>
//           {!selectedSection ? (
//             <>
//               <button onClick={handleSecClick}>Profile</button>
//               <button onClick={handleClick}>My Order</button>
//               <button onClick={() => setSelectedSection("settings")}>Settings</button>
//                {/* <button onClick={handleLogout}>Logout</button> */}

//             </>
//           ) : (
//             <div className="popup-content">
//               {selectedSection === "settings" && (
//                 <div>
//                   <h3>⚙️ Settings</h3>
//                   <p>Show settings here...</p>
//                 </div>
//               )}

//               <button className="back-btn" onClick={() => setSelectedSection(null)}>⬅ Back</button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };



"use client";

import React, { useState, useEffect, useRef } from "react";
import account from "../assets/user.png";
import logo from "../assets/LogoWhite.png";
import cart from "../assets/cart.png";
import search from "../assets/find.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";

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
