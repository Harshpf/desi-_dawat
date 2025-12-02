                                                                                                                                                                                                                                
                                                                                                                                                                                                                                  
// import React from "react";
// import "./OrderList.css";

// export default function OrderList() {
//   const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));

//   if (!lastOrder) {
//     return (
//       <div className="order-summary-container">
//         <h2>No order found</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="order-summary-container">
//       <h2>Order Summary</h2>
//       <p className="order-id">Order ID: {lastOrder.id}</p>

//       <div className="order-items">
//         {lastOrder.items.map((item, index) => (
//           <div key={index} className="order-card">
//             <img src={item.image} alt={item.name} className="order-image" />
//             <div className="order-details">
//               <h3 className="order-name">{item.name}</h3>
//               <p>Weight: {item.weight}</p>
//               <p>Quantity: {item.quantity}</p>
//               {/* <p>Unit Price: ₹{item.unitPrice}</p> */}
//               <p>price: ₹{item.total}</p>
//               <p className="delivery-date">
//                 Delivery by: {new Date().toLocaleDateString("en-IN", {
//                   weekday: "short",
//                   day: "numeric",
//                   month: "short",
//                 })}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* <h3 className="order-total">Grand Total: ₹{lastOrder.total}</h3> */}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { getAllOrders } from "./Allapi"; // make sure path is correct
// import "./OrderList.css";

// export default function OrderList() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await getAllOrders();
//         if (res.data.orders) {
//           setOrders(res.data.orders);
//         }
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <div className="order-summary-container"><h2>Loading orders...</h2></div>;
//   }

//   if (!orders.length) {
//     return <div className="order-summary-container"><h2>No orders found</h2></div>;
//   }

//   return (
//     <div className="order-summary-container">
//       <h2>All Orders</h2>
//       {orders.map((orderData, index) => {
//         const { userOrder, productOrder } = orderData;
//         return (
//           <div key={index} className="order-card-container">
//             <p className="order-id">Order ID: {userOrder._id}</p>
//             <p>Order Date: {new Date(userOrder.createdAt).toLocaleDateString("en-IN", {
//               weekday: "short",
//               day: "numeric",
//               month: "short",
//             })}</p>

//             <div className="order-items">
//               {productOrder.items.map((item, idx) => (
//                 <div key={idx} className="order-card">
//                   <img src={item.image || "/placeholder.png"} alt={item.name} className="order-image" />
//                   <div className="order-details">
//                     <h3 className="order-name">{item.name}</h3>
//                     <p>Quantity: {item.quantity}</p>
//                     <p>Price: ₹{item.price}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <p className="order-total">Total Amount: ₹{productOrder.totalAmount}</p>
//             <p className="order-status">Status: {productOrder.orderStatus}</p>
//             <hr />
//           </div>
//         );
//       })}
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { getAllOrders } from "./Allapi";
// import "./OrderList.css";

// export default function OrderList() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const baseURL = "http://localhost:5000/";

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await getAllOrders();
//         setOrders(res.data.orders || []);
//       } catch (err) {
//         console.log("Order fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) return <h2>Loading orders...</h2>;
//   if (!orders.length) return <h2>No orders found</h2>;

//   return (
//     <div className="order-summary-container">
//       <h2>All Orders</h2>

//       {orders.map((orderData, index) => {
//         const { userOrder, productOrder } = orderData;

//         return (
//           <div key={index} className="order-card-container">
//             <p>Order ID: {userOrder._id}</p>
//             <p>
//               Date:{" "}
//               {new Date(userOrder.createdAt).toLocaleDateString("en-IN", {
//                 weekday: "short",
//                 day: "numeric",
//                 month: "short",
//               })}
//             </p>

//             {/* <div className="order-items">
//               {productOrder.items.map((item, idx) => (
//                 <div key={idx} className="order-card">
                  
//                   <img
//                     src={`${baseURL}${item.image}` || "/placeholder.png"}
//                     alt={item.name}
//                     className="order-image"
//                   />

//                   <div className="order-details">
//                     <h3>{item.name}</h3>
//                     <p>Qty: {item.quantity}</p>
//                     <p>Price: ₹{item.price}</p>
//                   </div>

//                 </div>
//               ))}
//             </div> */}
//             <div className="order-items">
//   {productOrder.items.map((item, idx) => (
//     <div key={idx} className="order-card">

//       {/* ⭐ PUT UPDATED IMG HERE */}
//       <img
//         src={item.image ? `${baseURL}${item.image}` : "/placeholder.png"}
//         alt={item.name}
//         className="order-image"
//       />

//       <div className="order-details">
//         <h3>{item.name}</h3>
//         <p>Qty: {item.quantity}</p>
//         <p>Price: ₹{item.price}</p>
//       </div>

//     </div>
//   ))}
// </div>


//             <p>Total Amount: ₹{productOrder.totalAmount}</p>
//             <p>Status: {productOrder.orderStatus}</p>

//             <hr />
//           </div>
//         );
//       })}
//     </div>
//   );
// }
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

