
// import React, { useState, useEffect } from "react";
// import "./Cart.css";
// import { useNavigate } from "react-router-dom";
// import { getCart, deletecart, mergeCart } from "./Allapi";

// export default function Cart() {
//   const [cart, setCart] = useState([]);

//   const navigate = useNavigate();
//   const baseURL = "http://localhost:5000/";

//   // Load local cart initially
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(stored);
//   }, []);

//   // Save to localStorage on every cart update
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

  

//   // Merge local → backend if logged in
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) return; // user not logged in

//     const mergeLocalToBackend = async () => {
//       try {
//         const localCart = JSON.parse(localStorage.getItem("cart")) || [];

//         if (localCart.length > 0) {
//           // send local cart product IDs to backend
//           const productIds = localCart.map((i) => i.productId);
//           await mergeCart(productIds); 
//            localStorage.removeItem("cart");
//         }

//         // fetch backend cart
//         const res = await getCart();

//         const mappedCart = res.data.cartProducts.map((item) => {
//           const p = item.productId;
//           return {
//             productId: p._id,
//             name: p.Name,
//             image: p.image?.length ? `${baseURL}${p.image[0]}` : "",
//             price: p.Price,
//             quantity: item.quantity,
//             total: item.quantity * p.Price,
//           };
//         });

//         setCart(mappedCart);
//         localStorage.setItem("cart", JSON.stringify(mappedCart));
//       } catch (err) {
//         console.error("Error merging cart:", err);
//       }
//     };

//     mergeLocalToBackend();
//   }, []);



//   // Increase quantity
//   const increaseQty = (productId) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.productId === productId
//           ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
//           : item
//       )
//     );
//   };

//   // Decrease quantity
//   const decreaseQty = (productId) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.productId === productId
//           ? {
//               ...item,
//               quantity: Math.max(item.quantity - 1, 1),
//               total: Math.max(item.quantity - 1, 1) * item.price,
//             }
//           : item
//       )
//     );
//   };

//   // Remove item
//   const removeItem = async (productId) => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     try {
//       // only call backend if logged in
//       if (user) {
//         await deletecart(productId); // token automatically sent via httpOnly cookie
//       }

//       // remove from local state & localStorage
//       setCart((prev) => prev.filter((item) => item.productId !== productId));
//     } catch (err) {
//       console.error("Error deleting:", err);
//     }
//   };

//   const grandTotal = cart.reduce((sum, item) => sum + item.total, 0);

//   return (
//     <div className="cart-page">
//       <h2>Shopping Cart</h2>

//       {cart.length === 0 ? (
//         <p>Your cart is empty!</p>
//       ) : (
//         <>
//           <div className="cart-header">
//             <span className="product">Product</span>
//             <span>Price</span>
//             <span>Quantity</span>
//             <span>Total</span>
//           </div>

//           <div className="cart-items">
//             {cart.map((item) => (
//               <div key={item.productId} className="cart-row">
//                 <div className="cart-product">
//                   <img src={item.image} alt={item.name} />
//                   <div>
//                     <h4>{item.name}</h4>
//                     <button className="remove-link" onClick={() => removeItem(item.productId)}>
//                       Remove
//                     </button>
//                   </div>
//                 </div>

//                 <div className="cart-price">₹{item.price.toFixed(2)}</div>

//                 <div className="cart-qty">
//                   <button onClick={() => decreaseQty(item.productId)}>-</button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => increaseQty(item.productId)}>+</button>
//                 </div>

//                 <div className="cart-total">₹{item.total.toFixed(2)}</div>
//               </div>
//             ))}
//           </div>

//           <div className="cart-grand-total">
//             <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
//             <button onClick={() => navigate("/checkout")} className="checkout-btn">
//               Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import "./Cart.css";
// import { useNavigate } from "react-router-dom";
// import { getCart, deletecart, mergeCart } from "./Allapi";

// export default function Cart() {
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();
//   const baseURL = "http://localhost:5000/";

//   /* -------------------------------
//      🔹 Load cart on page load
//   -------------------------------- */
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!user) {
//       // Guest → load local cart
//       const stored = JSON.parse(localStorage.getItem("cart")) || [];
//       setCart(stored);
//     } else {
//       // Logged in → merge then load backend cart
//       mergeAndFetchCart();
//     }
//   }, []);

//   /* -------------------------------
//      🔹 Save LOCAL cart (guest only)
//   -------------------------------- */
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     }
//   }, [cart]);

//   /* -------------------------------
//      🔹 Merge LOCAL → BACKEND (ON LOGIN)
//   // -------------------------------- */
//   // const mergeAndFetchCart = async () => {
//   //   try {
//   //     const alreadyMerged = localStorage.getItem("cartMerged");

//   //     if (!alreadyMerged) {
//   //       const localCart = JSON.parse(localStorage.getItem("cart")) || [];

//   //       if (localCart.length > 0) {
//   //         const productIds = localCart.map(item => item.productId);
//   //         await mergeCart(productIds);
//   //       }

//   //       localStorage.removeItem("cart");
//   //       localStorage.setItem("cartMerged", "true");
//   //     }

//   //     // Fetch backend cart
//   //     const res = await getCart();

//   //     const mappedCart = res.data.cartProducts.map(item => {
//   //       const p = item.productId;
//   //       return {
//   //         productId: p._id,
//   //         name: p.Name,
//   //         image: p.image?.length ? `${baseURL}${p.image[0]}` : "",
//   //         price: p.Price,
//   //         quantity: item.quantity,
//   //         total: item.quantity * p.Price
//   //       };
//   //     });

//   //     setCart(mappedCart);
//   //   } catch (err) {
//   //     console.error("Merge / fetch failed:", err);
//   //   }
//   // };


//   const mergeAndFetchCart = async () => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) return;

//     const mergeKey = `cartMerged_${user._id}`;
//     const alreadyMerged = localStorage.getItem(mergeKey);

//     if (!alreadyMerged) {
//       const localCart = JSON.parse(localStorage.getItem("cart")) || [];

//       if (localCart.length > 0) {
//         const productIds = localCart.map(item => item.productId);
//         await mergeCart(productIds);
//       }

//       localStorage.removeItem("cart"); // ✅ remove ONLY AFTER merge
//       localStorage.setItem(mergeKey, "true");
//     }

//     const res = await getCart();

//     const mappedCart = res.data.cartProducts.map(item => {
//       const p = item.productId;
//       return {
//         productId: p._id,
//         name: p.Name,
//         image: p.image?.length ? `${baseURL}${p.image[0]}` : "",
//         price: p.Price,
//         quantity: item.quantity,
//         total: item.quantity * p.Price
//       };
//     });

//     setCart(mappedCart);
//   } catch (err) {
//     console.error("Merge failed:", err);
//   }
// };


//   /* -------------------------------
//      🔹 Quantity (UI only)
//   -------------------------------- */
//   const increaseQty = (productId) => {
//     setCart(prev =>
//       prev.map(item =>
//         item.productId === productId
//           ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
//           : item
//       )
//     );
//   };

//   const decreaseQty = (productId) => {
//     setCart(prev =>
//       prev.map(item =>
//         item.productId === productId
//           ? {
//               ...item,
//               quantity: Math.max(item.quantity - 1, 1),
//               total: Math.max(item.quantity - 1, 1) * item.price
//             }
//           : item
//       )
//     );
//   };

//   /* -------------------------------
//      🔹 Remove item
//   -------------------------------- */
//   const removeItem = async (productId) => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     try {
//       if (user) {
//         await deletecart(productId);
//       }

//       setCart(prev => prev.filter(item => item.productId !== productId));
//     } catch (err) {
//       console.error("Delete failed:", err);
//     }
//   };

//   const grandTotal = cart.reduce((sum, item) => sum + item.total, 0);

//   return (
//     <div className="cart-page">
//       <h2>Shopping Cart</h2>

//       {cart.length === 0 ? (
//         <p>Your cart is empty!</p>
//       ) : (
//         <>
//           <div className="cart-header">
//             <span className="product">Product</span>
//             <span>Price</span>
//             <span>Quantity</span>
//             <span>Total</span>
//           </div>

//           <div className="cart-items">
//             {cart.map(item => (
//               <div key={item.productId} className="cart-row">
//                 <div className="cart-product">
//                   <img src={item.image} alt={item.name} />
//                   <div>
//                     <h4>{item.name}</h4>
//                     <button
//                       className="remove-link"
//                       onClick={() => removeItem(item.productId)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>

//                 <div className="cart-price">₹{item.price.toFixed(2)}</div>

//                 <div className="cart-qty">
//                   <button onClick={() => decreaseQty(item.productId)}>-</button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => increaseQty(item.productId)}>+</button>
//                 </div>

//                 <div className="cart-total">₹{item.total.toFixed(2)}</div>
//               </div>
//             ))}
//           </div>

//           <div className="cart-grand-total">
//             <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
//             <button
//               onClick={() => navigate("/checkout")}
//               className="checkout-btn"
//             >
//               Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }





import React, { useState, useEffect, useCallback } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { getCart, deletecart, mergeCart } from "./Allapi";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000/";

  // merge function (useCallback so same identity when used as listener)
  const mergeAndFetchCart = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        // if no user, load guest local cart
        const stored = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(stored);
        return;
      }

      const mergeKey = `cartMerged_${user._id}`;
      const alreadyMerged = localStorage.getItem(mergeKey);

      if (!alreadyMerged) {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];

        if (localCart.length > 0) {
          const productIds = localCart.map(item => item.productId);

          // log for debugging
          console.log("Merging local cart -> backend", productIds);

          // call backend merge (ensure mergeCart sends { productArray: [...] } )
          await mergeCart(productIds);
        }

        // only remove local cart AFTER successful merge
        localStorage.removeItem("cart");
        localStorage.setItem(mergeKey, "true");
      } else {
        console.log("Already merged for user:", user._id);
      }

      // fetch backend cart and set UI
      const res = await getCart();
      const mappedCart = res.data.cartProducts.map(item => {
        const p = item.productId;
        return {
          productId: p._id,
          name: p.Name,
          image: p.image?.length ? `${baseURL}${p.image[0]}` : "",
          price: p.Price,
          quantity: item.quantity,
          total: item.quantity * p.Price
        };
      });

      setCart(mappedCart);
    } catch (err) {
      console.error("Merge/fetch failed:", err);
    }
  }, [baseURL]);

  /* -------------------------------
     Run on mount (load guest cart or merge if already logged in)
  -------------------------------- */
  useEffect(() => {
    mergeAndFetchCart();
  }, [mergeAndFetchCart]);

  /* -------------------------------
     Persist local cart only when guest
  -------------------------------- */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  /* -------------------------------
     Listen for login/logout events from other components
     We dispatch 'userChanged' event from Login and Logout code.
  -------------------------------- */
  useEffect(() => {
    const handler = () => {
      // when user logs in/out elsewhere in the app, re-run merge/fetch flow
      mergeAndFetchCart();
    };

    window.addEventListener("userChanged", handler);
    return () => window.removeEventListener("userChanged", handler);
  }, [mergeAndFetchCart]);

  /* -------------------------------
     Quantity and remove handlers
  -------------------------------- */
  const increaseQty = (productId) => {
    setCart(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      )
    );
  };

  const decreaseQty = (productId) => {
    setCart(prev =>
      prev.map(item =>
        item.productId === productId
          ? {
              ...item,
              quantity: Math.max(item.quantity - 1, 1),
              total: Math.max(item.quantity - 1, 1) * item.price
            }
          : item
      )
    );
  };

  const removeItem = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        await deletecart(productId);
      }
      setCart(prev => prev.filter(item => item.productId !== productId));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const grandTotal = cart.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <div className="cart-header">
            <span className="product">Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          <div className="cart-items">
            {cart.map(item => (
              <div key={item.productId} className="cart-row">
                <div className="cart-product">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <button
                      className="remove-link"
                      onClick={() => removeItem(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="cart-price">₹{item.price.toFixed(2)}</div>

                <div className="cart-qty">
                  <button onClick={() => decreaseQty(item.productId)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.productId)}>+</button>
                </div>

                <div className="cart-total">₹{item.total.toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="cart-grand-total">
            <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
            <button onClick={() => navigate("/checkout")} className="checkout-btn">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
