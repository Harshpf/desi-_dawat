import React, { useState, useEffect } from "react";
import "./Specialpro.css";
import { useNavigate } from "react-router-dom";
import { getspecialproduct, addtocart } from "./Allapi";

export const Specialpro = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // fetched products
  const [cartData, setCartData] = useState([]); // weight & qty for each product
  const baseURL = "http://localhost:5000/"; // for images if backend returns paths

  // Fetch special products
  useEffect(() => {
    const fetchSpecialProducts = async () => {
      try {
        const res = await getspecialproduct("specialcategory"); // pass your category
        const data = res.data.map((product) => ({
          id: product._id,
          name: product.Name,
          price: product.Price, // now Price is a number
          img: product.image?.length > 0 ? `${baseURL}${product.image[0]}` : "",
        }));

        setProducts(data);
        setCartData(data.map(() => ({ weight: "200g", qty: 1 }))); // init cartData
      } catch (err) {
        console.error("Error fetching special products", err);
      }
    };

    fetchSpecialProducts();
  }, []);

  // Handle weight change (for future use if backend has weight-based price)
  const handleWeightChange = (index, value) => {
    const updated = [...cartData];
    updated[index].weight = value;
    setCartData(updated);
  };

  // Handle quantity change
  const handleQtyChange = (index, delta) => {
    const updated = [...cartData];
    updated[index].qty = Math.max(1, updated[index].qty + delta);
    setCartData(updated);
  };

  // Handle Add to Cart
  const handleAddToCart = async (index) => {
    const product = products[index];
    const { weight, qty } = cartData[index];
    const unitPrice = product.price; // use numeric price
    const total = unitPrice * qty;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const newItem = {
      productId: product.id,
      name: product.name,
      key: product.id, // use backend id for unique key
      image: product.img,
      weight,
      quantity: qty,
      unitPrice,
      total,
    };

    // Check if item exists
    const existingIndex = cart.findIndex(
      (item) => item.productId === newItem.productId && item.weight === weight
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += qty;
      cart[existingIndex].total =
        cart[existingIndex].quantity * cart[existingIndex].unitPrice;
    } else {
      cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // POST API for Add Cart
    try {
      console.log("Sending productId:", product.id);
      const res = await addtocart(product.id, newItem);
      console.log(res.data);
      console.log("Cart updated");
    } catch (err) {
      console.log("Error adding to cart", err);
    }

    navigate("/cart");
  };

  return (
    <div className="special-container">
      <h1>Explore Our Premium Collection</h1>
      <div className="specialcard-container">
        {products.map((item, index) => {
          const { weight, qty } = cartData[index] || { weight: "200g", qty: 1 };
          const itemPrice = item.price; // numeric price

          return (
            <div className="specialcard" key={item.id}>
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="price">₹{itemPrice * qty}</p>

              {/* Weight Selector */}
              <select
                value={weight}
                onChange={(e) => handleWeightChange(index, e.target.value)}
              >
                <option value="200g">200g</option>
                <option value="500g">500g</option>
              </select>

              <div className="btn-container">
                {/* Quantity Counter */}
                <div className="qty-counter">
                  <button onClick={() => handleQtyChange(index, -1)}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => handleQtyChange(index, 1)}>+</button>
                </div>

                <button
                  className="add-cart-btn"
                  onClick={() => handleAddToCart(index)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
