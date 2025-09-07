import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"

function Sidebar() {
  return (
    <div  className="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/banners">Banners</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
