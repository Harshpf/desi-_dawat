import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmOrder.css"; // ✅ import CSS

export default function ConfirmOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!order) {
    return (
      <div className="confirm-container">
        <h2>No order found</h2>
        <button className="btn-back" onClick={() => navigate("/checkout")}>
          Back to Checkout
        </button>
      </div>
    );
  }

  const handleYes = () => {
    localStorage.setItem("lastOrder", JSON.stringify(order));
    localStorage.removeItem("cart");
    setOrderPlaced(true);
  };

  const handleNo = () => {
    navigate("/checkout");
  };

  return (
    <div className="confirm-container">
      <h2>Are you sure you want to confirm this order?</h2>

      <div className="button-group">
        <button
          onClick={handleYes}
          className="btn-yes"
          disabled={orderPlaced}
        >
          Yes
        </button>

        <button
          onClick={handleNo}
          className="btn-no"
          disabled={orderPlaced}
        >
          No
        </button>
      </div>

      {orderPlaced && (
        <h3 className="success-message">🎉 Order placed successfully!</h3>
      )}
    </div>
  );
}
