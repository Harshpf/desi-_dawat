// import React from "react";
import "./Sidebar.css";
import img from "../assets/card.jpeg";

import React, {useState,useEffect} from "react";
import axios from 'axios';
// import { getallproduct } from "./Allapi";



export default function Sidebar({ onCategorySelect, defaultCategory = "all" }) {
  const categories = [
    { name: "All Products", key: "all", image: null },
    { name: "Dry Fruits", key: "dryfruits", image: img },
    { name: "Snacks", key: "snacks", image: img },
    { name: "Desi biscuits", key: "Desibiscuits", image: img },
    { name: "Dry Fruits Sweets", key: "DryFruitsSweets", image: img },
    { name: "Sugarless Sweets", key: "SugarlessSweets", image: img },
    { name: "Festival Sweets", key: "FestivalSweets", image: img },
    { name: "Gifting", key: "gifting", image: img }
  ];

  


      // State with defaultCategory
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  // Update state and call onCategorySelect when defaultCategory changes
  useEffect(() => {
    setActiveCategory(defaultCategory);
    onCategorySelect(defaultCategory);
  }, [defaultCategory, onCategorySelect]);
                                                       
  const handleClick = (key) => {
    setActiveCategory(key);
    onCategorySelect(key);
  };


  return (
    <aside className="sidebar">
      {categories.map((cat) => (
        <div
          key={cat.key}
         className={`sidebar-item ${activeCategory === cat.key ? "active" : ""}`}
                   onClick={() => handleClick(cat.key)}


        //   onClick={() => onCategorySelect(cat.key)}
        >
          {cat.image && <img src={cat.image} alt={cat.name} />}
          <span>{cat.name}</span>
        </div>
      ))}
    </aside>
  );
}


