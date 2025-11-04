

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import "./Allproduct.css";
import { addtocart, getProductByCategory, getallproduct } from "./Allapi";

export default function Allproduct() {
  const [loading, setLoading] = useState(true);
  const baseURL = "http://localhost:5000/";

  const [categories, setCategories] = useState({});
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [weights, setWeights] = useState({});
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (location.state?.selectedCategory?.toLowerCase()) {
      return location.state.selectedCategory;
    }
    return localStorage.getItem("selectedCategory") || "all";
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        if (selectedCategory === "all") {
          const res = await getallproduct();
          const grouped = res.data.reduce((acc, product) => {
            const key = product.Category.toLowerCase().replace(/\s+/g, "").trim();
            if (!acc[key]) acc[key] = [];
            acc[key].push({
              key: product._id,
              name: product.Name,
              price: product.Price,
              image:
                product.image?.length > 0 ? `${baseURL}${product.image[0]}` : "",
            });
            return acc;
          }, {});
          setCategories(grouped);
        } else {
          const res = await getProductByCategory(  selectedCategory.toLowerCase(), "null");
               const products = res.data;
          setCategories({
            [selectedCategory]: products.map((p) => ({
              key: p._id,
              name: p.Name,
              price: p.Price,
              image: p.image?.length > 0 ? `${baseURL}${p.image[0]}` : "",
            })),
          });
        }
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Save selected category
  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  // Add to cart
  // const handleAddToCart = async (product) => {
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];

  //   const quantity = quantities[product.key] || 1;
  //   const weight = weights[product.key] || "500g";

  //   const newItem = {
  //     ...product,
  //     quantity,
  //     weight,
  //     unitPrice: product.price,
  //     total: product.price * quantity,
  //   };

  //   const existingIndex = cart.findIndex(
  //     (item) => item.key === product.key && item.weight === weight
  //   );

  //   if (existingIndex >= 0) {
  //     cart[existingIndex].quantity += quantity;
  //     cart[existingIndex].total =
  //       cart[existingIndex].quantity * cart[existingIndex].unitPrice;
  //   } else {
  //     cart.push(newItem);
  //   }

  //   localStorage.setItem("cart", JSON.stringify(cart));

  //   try {
  //     await addtocart(product.key, newItem);
  //     console.log("Cart updated");
  //   } catch (err) {
  //     console.log("Error adding to cart", err);
  //   }

  //   navigate("/cart");
  // };

  // Add to cart
const handleAddToCart = async (product) => {
  const user = JSON.parse(localStorage.getItem("user")); // check login
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const quantity = quantities[product.key] || 1;
  const weight = weights[product.key] || "500g";

  const newItem = {
    ...product,
    quantity,
    weight,
    unitPrice: product.price,
    total: product.price * quantity,
  };

  // ✅ If user is logged in → send to backend only
  if (user && user.token) {
    try {
      await addtocart(product.key, newItem); // API call to backend
      console.log("✅ Added to backend cart");
      navigate("/cart");
      return; // stop here, don’t add to localStorage
    } catch (err) {
      console.error("❌ Error adding to backend cart:", err);
    }
  }

  // 🧍 Guest user → store in localStorage
  const existingIndex = cart.findIndex(
    (item) => item.key === product.key && item.weight === weight
  );

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
    cart[existingIndex].total =
      cart[existingIndex].quantity * cart[existingIndex].unitPrice;
  } else {
    cart.push(newItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("🛒 Added to local cart");
  navigate("/cart");
};


  // Quantity controls
  const increaseQty = (key) => {
    setQuantities((prev) => ({ ...prev, [key]: (prev[key] || 1) + 1 }));
  };

  const decreaseQty = (key) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: prev[key] > 1 ? prev[key] - 1 : 1,
    }));
  };

  const handleWeightChange = (key, value) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  };

  // Sidebar category select
  const handleCategorySelect = (categoryKey) => {
    setSelectedCategory(categoryKey);
  };

  // Render products
  const renderProducts = () => {
    if (loading) return <div className="loading">Loading...</div>;

    const products =
      selectedCategory === "all"
        ? Object.values(categories).flat()
        : categories[selectedCategory] || [];

    if (!products.length) return <h2>No products found</h2>;

    return (
      <>
        <h2>
          {selectedCategory === "all"
            ? "All Products"
            : selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)}
        </h2>

        <div className="products-grid">
          {products.map((p) => (
            <div key={p.key} className="product-card">
              <img src={p.image} alt={p.name} />
              <span className="product-name">{p.name}</span>
              <span className="product-price">
                ₹{(p.price * (quantities[p.key] || 1)).toFixed(2)}
              </span>

              <div className="weight-selector">
                <select
                  value={weights[p.key] || ""}
                  onChange={(e) => handleWeightChange(p.key, e.target.value)}
                >
                  <option value="200g">200g</option>
                  <option value="500g">500g</option>
                </select>
              </div>

              <div className="quantity-controls">
                <div className="counter-btn">
                  <button onClick={() => decreaseQty(p.key)}>-</button>
                  <span>{quantities[p.key] || 1}</span>
                  <button onClick={() => increaseQty(p.key)}>+</button>
                </div>
                <div className="addcart-btn">
                  <button onClick={() => handleAddToCart(p)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="allproduct-page">
      {/* Sidebar scrollable */}
      <aside className="sidebar scrollable">
        <Sidebar
          defaultCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      </aside>

      {/* Products area */}
      <div className="product-list">{renderProducts()}</div>
    </div>
  );
}
