import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, addtocart } from "./Allapi";
import "./SingleProduct.css";

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000/";
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [weight, setWeight] = useState("500g");

  // Fetch single product
  useEffect(() => {
    const fetchSingle = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product", err);
      }
    };

    fetchSingle();
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  // Handle add to cart
  const handleAdd = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const newItem = {
      // key: product._id,
      // name: product.Name,
      // image: product.image?.length ? `${baseURL}${product.image[0]}` : "",
      // price: product.Price,
      // quantity: qty,
      // weight,
      // unitPrice: product.Price,
      // total: product.Price * qty,

         productId: product._id,  // ⭐ FIX
    name: product.Name,
    image: product.image?.length
      ? `${baseURL}${product.image[0]}`
      : "",
    price: product.Price,
    quantity: qty,
    weight,
    total: product.Price * qty,
    };

    if (user) {
      await addtocart(product._id, newItem);
      navigate("/cart");
      return;
    }

    // guest
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(newItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  const handleBuyNow = () => {
    handleAdd();
    navigate("/checkout");
  };

  return (
    <div className="single-product">
      <img
        src={`${baseURL}${product.image[0]}`}
        alt={product.Name}
        className="single-img"
      />

      <div className="single-info">
        <h1>{product.Name}</h1>
        <h3>₹{product.Price}</h3>

        <p className="desc">{product.Description || "No description available"}</p>

        <label>Weight:</label>
        <select value={weight} onChange={(e) => setWeight(e.target.value)}>
          <option value="200g">200g</option>
          <option value="500g">500g</option>
        </select>

        <label>Quantity:</label>
        <div className="qty-box">
          <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>

        <div className="btn-group">
  <button className="add-btn" onClick={handleAdd}>Add to Cart</button>
  <button className="buy-btn" onClick={handleBuyNow}>Buy Now</button>
</div>


        {/* <button className="add-btn" onClick={handleAdd}>
          Add to Cart
        </button>

        <button className="buy-btn" onClick={handleBuyNow}>
          Buy Now
        </button> */}
      </div>
    </div>
  );
}
