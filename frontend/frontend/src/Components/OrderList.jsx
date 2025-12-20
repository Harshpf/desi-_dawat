
import React, { useEffect, useState } from "react";
import { getAllOrders } from "./Allapi";
import "./OrderList.css";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL = "http://localhost:5000/";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();
        setOrders(res.data.orders || []);
      } catch (err) {
        console.log("Order fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <h2>Loading orders...</h2>;
  if (!orders.length) return <h2>No orders found</h2>;

  return (
    <div className="order-summary-container">
      <h2>All Orders</h2>

      {orders.map((orderData, index) => {
        const { userOrder, productOrder } = orderData;

        const items = productOrder?.items || []; // ⭐ SAFETY FIX

        return (
          <div key={index} className="order-card-container">
            <p>Order ID: {userOrder._id}</p>
            <p>
              Date:{" "}
              {new Date(userOrder.createdAt).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </p>

            {/* ⭐ RENDER ITEMS SAFELY */}
            <div className="order-items">
              {items.map((item, idx) => (
                <div key={idx} className="order-card">
                  <img
                    src={
                      item.image
                        ? `${baseURL}${item.image}`
                        : "/placeholder.png"
                    }
                    alt={item.name}
                    className="order-image"
                  />

                  <div className="order-details">
                    <h3>{item.name}</h3>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                    <p>Subtotal: ₹{item.quantity * item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <p>Total Amount: ₹{productOrder?.totalAmount || 0}</p>
            <p>Status: {productOrder?.orderStatus || "pending"}</p>

            <hr />
          </div>
        );
      })}
    </div>
  );
}

