

import React, { useState, useEffect,useRef } from 'react';
import account from '../assets/user.png';
import logo from '../assets/LogoWhite.png';
import cart from '../assets/cart.png';
import search from '../assets/find.png';
import './Header.css';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  // const [showSearchBar, setShowSearchBar] = useState(false);
  // const searchRef = useRef(null);
  const navigate = useNavigate();



  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        
        setShowHeader(false);
      } else {
        
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  


   const handleClick = () => {
      navigate("/login")
   }

   const handleaddtocart = () =>{
    navigate('./cart')
   }

  return (
  
    <div>
        {/* Main header */}
       <header className={`main-header ${showHeader ? 'show' : 'hide'}`}>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="menu">
          <a href="Home">Home</a>
          <a href="Review">Review</a>
          <a href="Contact Us">Contact Us</a>
        </div>

        <div className="search-icon">
          <input type="search" />

          <img src={search} alt="Search" />
        </div>

        <div className="account" onClick={handleClick}>
          <img src={account} alt="Account"  />
        </div>

        <div className="cart">
          <img src={cart} alt="Cart" onClick={handleaddtocart}/>
        </div>
      </header>
    </div>

    
  );
};
