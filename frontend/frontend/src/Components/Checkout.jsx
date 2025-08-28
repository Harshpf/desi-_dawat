import React, { useEffect, useState } from "react";
import "./Checkout.css";

export default function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const grandTotal = cart.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. Add items before checkout.</p>
      ) : (
        <>
          <div className="checkout-items">
            {cart.map((item) => (
              <div key={`${item.key}-${item.weight}`} className="checkout-row">
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.weight}</p>
                  <p>
                    {item.quantity} × ₹{item.unitPrice.toFixed(2)} = ₹
                    {item.total.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="checkout-total">Grand Total: ₹{grandTotal.toFixed(2)}</h3>

          <form className="checkout-form">
            <h3>Billing Details</h3>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Address" required />
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="Pincode" required />

            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
}
