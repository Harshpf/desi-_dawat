



import React, { useState, useEffect } from 'react';
import account from '../assets/user.png';
import logo from '../assets/LogoWhite.png';
import cart from '../assets/cart.png';
import search from '../assets/find.png';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import Profile from "./Profile";


export const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);


  const navigate = useNavigate();

  // 🔹 Hide / Show header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // 🔹 When clicking account
  const handleAccountClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; 
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setShowPopup(!showPopup);
      setSelectedSection(null); // reset section
    }
  };

  const handleClick=() =>{
    navigate('/orderlist')
  }

  // 🔹 Logout using backend API
//   // const handleLogout = async () => {
//   //   try {
//   //     await fetch("http://localhost:5000/auth/logout", {
//   //       method: "POST",
//   //       credentials: "include", // send cookies
//   //     });

//   //     localStorage.removeItem("isLoggedIn"); // clear frontend
//   //     setIsLoggedIn(false);
//   //     setShowPopup(false);

//   //     navigate("/login");
//   //   } catch (err) {
//   //     console.error("Logout failed:", err);
//   //   }
//   // };

  return (
    <div>
      <header className={`main-header ${showHeader ? 'show' : 'hide'}`}>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="menu">
          <a href="/">Home</a>
          <a href="/review">Review</a>
          
          <a onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}>
  Contact Us
</a>

        </div>

        <div className="search-icon">
          <input type="search" />
          <img src={search} alt="Search" />
        </div>

        {/* Account Icon */}
        <div className="account" onClick={handleAccountClick}>
          <img src={account} alt="Account" />
        </div>

        {/* Cart Icon */}
        <div className="cart" onClick={() => navigate('/cart')}>
          <img src={cart} alt="Cart" />
        </div>
      </header>

      {/* ✅ Popup only if logged in */}
      {showPopup && (
        <div className={`popup-card ${selectedSection ? "expanded" : ""}`}>
          {!selectedSection ? (
            <>
              <button onClick={() => setSelectedSection("profile")}>Profile</button>
              <button onClick={handleClick}>My Order</button>
              {/* <button onClick={() => setSelectedSection("orders")}>Orders</button> */}
              <button onClick={() => setSelectedSection("settings")}>Settings</button>
                     {/* <button onClick={handleLogout}>Logout</button> */}

            </>
          ) : (
            <div className="popup-content">
              {selectedSection === "profile" && <Profile />}
              {selectedSection === "orders" && (
                <div>
                  <h3>📦 Orders</h3>
                  <p>Show order history here...</p>
                </div>
              )}
              {selectedSection === "settings" && (
                <div>
                  <h3>⚙️ Settings</h3>
                  <p>Show settings here...</p>
                </div>
              )}

              <button className="back-btn" onClick={() => setSelectedSection(null)}>⬅ Back</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

