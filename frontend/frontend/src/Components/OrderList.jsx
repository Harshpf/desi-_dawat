                                                                                                                                                                                                                                
                                                                                                                                                                                                                                  
import React from "react";
import "./OrderList.css";

export default function OrderList() {
  const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));

  if (!lastOrder) {
    return (
      <div className="order-summary-container">
        <h2>No order found</h2>
      </div>
    );
  }

  return (
    <div className="order-summary-container">
      <h2>Order Summary</h2>
      <p className="order-id">Order ID: {lastOrder.id}</p>

      <div className="order-items">
        {lastOrder.items.map((item, index) => (
          <div key={index} className="order-card">
            <img src={item.image} alt={item.name} className="order-image" />
            <div className="order-details">
              <h3 className="order-name">{item.name}</h3>
              <p>Weight: {item.weight}</p>
              <p>Quantity: {item.quantity}</p>
              {/* <p>Unit Price: ₹{item.unitPrice}</p> */}
              <p>price: ₹{item.total}</p>
              <p className="delivery-date">
                Delivery by: {new Date().toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* <h3 className="order-total">Grand Total: ₹{lastOrder.total}</h3> */}
    </div>
  );
}
