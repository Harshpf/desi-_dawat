import React from 'react'
import facebook from '../assets/facebook.png';
import thankyou from '../assets/thankyou.png';

import './Fotter.css'
export const Fotter = () => {
  return (
    <div>
         <div className="fotter-container">
        
                  <div className="logo-fotter">
                    {/* <img src={logo} alt="" srcset="" /> */}
                  </div>
        
                  <div className="fotter-content">
        
                    <div className="range">
                      <h1>Menu</h1>
                      <a href="">Home</a>
                      <a href="">Review</a>
                      <a href="">About</a>
                  
                    </div>
{/*         
                    <div className="About">
                      <h1>About</h1>
                      <a href="">Company</a>
                      <a href="">Our Brands</a>
                     
                    </div> */}

                    <div className="authlogo">
                      {/* <img src={thankyou} alt="" /> */}
                    </div>
        
                    <div className="Legal">
                      <h1>Contact Us</h1>
                      <a href="">Phone: +91 6262626</a>
                      <a href="">Email id: abc@gmail.com</a>
                       <div className="socialicon">
                            <h1>On Social Media</h1>
                        <a href="https://www.facebook.com" target="_blank">
                          <img src={facebook} alt="Facebook" width="25" height="25" srcset="" />
                        </a>
                        <a href="https://www.facebook.com" target="_blank">
                          <img src={facebook} alt="Facebook" width="25" height="25" srcset="" />
                        </a>
                        <a href="https://www.facebook.com" target="_blank">
                          <img src={facebook} alt="Facebook" width="25" height="25" srcset="" />
                        </a>
                       </div>
                      
                    </div>
        
                  </div>
        
                </div>

                <div className="stamp">
                  <p>2025@copyright desidawat..</p>
                </div>
    </div>
  )
}
