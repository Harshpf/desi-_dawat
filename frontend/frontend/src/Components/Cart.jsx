// import React, { useState, useEffect } from "react";
// import "./Cart.css";
// import { useNavigate } from "react-router-dom";  // ⬅️ import navigate
// import { getCart } from "./Allapi";

// export default function Cart() {
//   const [cart, setCart] = useState([]);
//     const navigate = useNavigate(); // ⬅️ hook


//   // Load cart from localStorage
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);


//     // Fetch cart from backend
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const res = await getCart();
//         setCart(res.data.cartProducts);
//       } catch (err) {
//         console.error("Error fetching cart", err);
//       }
//     };
//     fetchCart();
//   }, []);

//   // Increase quantity
//   const increaseQty = (key, weight) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.key === key && item.weight === weight
//           ? {
//               ...item,
//               quantity: item.quantity + 1,
//               total: (item.quantity + 1) * item.unitPrice,
//             }
//           : item
//       )
//     );
//   };

//   // Decrease quantity
//   const decreaseQty = (key, weight) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.key === key && item.weight === weight
//           ? {
//               ...item,
//               quantity: item.quantity > 1 ? item.quantity - 1 : 1,
//               total:
//                 (item.quantity > 1 ? item.quantity - 1 : 1) * item.unitPrice,
//             }
//           : item
//       )
//     );
//   };

//   // Remove item
//   const removeItem = (key, weight) => {
//     const updatedCart = cart.filter(
//       (item) => !(item.key === key && item.weight === weight)
//     );
//     setCart(updatedCart);
//   };

//   // Cart Total
//   const grandTotal = cart.reduce((sum, item) => sum + item.total, 0);

//   return (
//     <div className="cart-page">
//       <h2>Shopping Cart</h2>

//       {cart.length === 0 ? (
//         <p>Your cart is empty!</p>
//       ) : (
//         <>
//           <div className="cart-header">
//             <span className="product" >Product</span>
//             <span> Price</span>
//             <span>Quantity</span>
//             <span>Total</span>
//           </div>

//           <div className="cart-items">
//             {cart.map((item) => (
//               <div key={`${item.key}-${item.weight}`} className="cart-row">
//                 {/* Product (Image + Name + Weight + Remove) */}
//                 <div className="cart-product">
//                   <img src={item.image} alt={item.name} />
//                   <div>
//                     <h4>{item.name}</h4>
//                     <p>{item.weight}</p>
//                     <button
//                       className="remove-link"
//                       onClick={() => removeItem(item.key, item.weight)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>

//                 {/* Unit Price */}
//                 <div className="cart-price">₹{item.unitPrice.toFixed(2)}</div>

//                 {/* Quantity */}
//                 <div className="cart-qty">
//                   <button onClick={() => decreaseQty(item.key, item.weight)}>
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => increaseQty(item.key, item.weight)}>
//                     +
//                   </button>
//                 </div>

//                 {/* Total per Item */}
//                 <div className="cart-total">₹{item.total.toFixed(2)}</div>
//               </div>
//             ))}
//           </div>

//           {/* Grand Total */}
//           <div className="cart-grand-total">
//             <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
//             <button onClick={() => navigate("/checkout")} // ⬅️ navigate to checkout
//               className="checkout-btn">Checkout</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { getCart, deletecart} from "./Allapi";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000/"; // for images

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart();

        // Map backend response to frontend structure
        const mappedCart = res.data.cartProducts.map((item) => {
          const product = item.productId;
          return {
            key: product._id,
            name: product.Name,
            image: product.image?.length > 0 ? `${baseURL}${product.image[0]}` : "",
            unitPrice: product.Price,
            quantity: 1,          // default
            weight: "500g",       // default
            total: product.Price, // default total
          };
        });

        setCart(mappedCart);
        localStorage.setItem("cart", JSON.stringify(mappedCart));
      } catch (err) {
        console.error("Error fetching cart", err);
      }
    };

    fetchCart();
  }, []);

  // Increase quantity
  const increaseQty = (key) => {
    setCart((prev) =>
      prev.map((item) =>
        item.key === key
          ? {
              ...item,
              quantity: item.quantity + 1,
              total: (item.quantity + 1) * item.unitPrice,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (key) => {
    setCart((prev) =>
      prev.map((item) =>
        item.key === key
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
              total:
                (item.quantity > 1 ? item.quantity - 1 : 1) * item.unitPrice,
            }
          : item
      )
    );
  };

  // Remove item
   const removeItem = async (key) => {
    try {
      await deletecart(key); // delete from backend
      setCart((prev) => prev.filter((item) => item.key !== key)); // remove locally
      localStorage.setItem("cart", JSON.stringify(cart.filter((item) => item.key !== key)));
    } catch (err) {
      console.error("Error deleting item", err);
    }
  };

  // Cart Total
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
            <span> Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.key} className="cart-row">
                {/* Product (Image + Name + Weight + Remove) */}
                <div className="cart-product">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.weight}</p>
                    <button
                      className="remove-link"
                      onClick={() => removeItem(item.key)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Unit Price */}
                {/* <div className="cart-price">₹{item.unitPrice.toFixed(2)}</div> */}
                <div className="cart-price">₹{(item.unitPrice || 0).toFixed(2)}</div>


                {/* Quantity */}
                <div className="cart-qty">
                  <button onClick={() => decreaseQty(item.key)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.key)}>+</button>
                </div>

                {/* Total per Item */}
                {/* <div className="cart-total">₹{item.total.toFixed(2)}</div> */}
                <div className="cart-total">₹{(item.total || 0).toFixed(2)}</div>

              </div>
            ))}
          </div>

          {/* Grand Total */}
          <div className="cart-grand-total">
            <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
            <button
              onClick={() => navigate("/checkout")}
              className="checkout-btn"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
