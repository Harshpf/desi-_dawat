

// import React, { useState, useEffect,useRef } from 'react';
// import account from '../assets/user.png';
// import logo from '../assets/LogoWhite.png';
// import cart from '../assets/cart.png';
// import search from '../assets/find.png';
// import './Header.css';
// import { useNavigate } from 'react-router-dom';

// export const Header = () => {
//   const [showHeader, setShowHeader] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   // const [showSearchBar, setShowSearchBar] = useState(false);
//   // const searchRef = useRef(null);
//   const navigate = useNavigate();



  

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > lastScrollY) {
        
//         setShowHeader(false);
//       } else {
        
//         setShowHeader(true);
//       }
//       setLastScrollY(window.scrollY);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [lastScrollY]);

  


//    const handleClick = () => {
//       navigate("/login")
//    }

//    const handleaddtocart = () =>{
//     navigate('./cart')
//    }

//   return (
  
//     <div>
//         {/* Main header */}
//        <header className={`main-header ${showHeader ? 'show' : 'hide'}`}>
//         <div className="logo">
//           <img src={logo} alt="Logo" />
//         </div>

//         <div className="menu">
//           <a href="Home">Home</a>
//           <a href="Review">Review</a>
//           <a href="Contact Us">Contact Us</a>
//         </div>

//         <div className="search-icon">
//           <input type="search" />

//           <img src={search} alt="Search" />
//         </div>

//         <div className="account" onClick={handleClick}>
//           <img src={account} alt="Account"  />
//         </div>

//         <div className="cart">
//           <img src={cart} alt="Cart" onClick={handleaddtocart}/>
//         </div>
//       </header>
//     </div>

    
//   );
// };



import React, { useState, useEffect } from 'react';
import account from '../assets/user.png';
import logo from '../assets/LogoWhite.png';
import cart from '../assets/cart.png';
import search from '../assets/find.png';
import './Header.css';
import { useNavigate } from 'react-router-dom';

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
              <button onClick={() => setSelectedSection("orders")}>Orders</button>
              <button onClick={() => setSelectedSection("settings")}>Settings</button>
                     {/* <button onClick={handleLogout}>Logout</button> */}

            </>
          ) : (
            <div className="popup-content">
              {selectedSection === "profile" && (
                <div className="profile-form">
                  <h3>👤 Profile Details</h3>
                  <form>
                    <label>Name</label>
                    <input type="text" placeholder="Enter your name" required />
                    
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" required />

                    <label>Phone</label>
                    <input type="tel" placeholder="Enter your phone" required />

                    <button type="submit" className="save-btn">Save</button>
                  </form>
                </div>
              )}
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

