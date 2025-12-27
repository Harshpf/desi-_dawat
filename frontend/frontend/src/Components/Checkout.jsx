

import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { getAddresses, addNewAddress, updateAddress, deleteAddress } from "./Allapi";
import { createOrder,getCart } from "./Allapi";
const baseURL = "http://localhost:5000/";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [tempAddress, setTempAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    addressType: "Home",
    saveAddress: false,
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    // const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    // setCart(storedCart);
    loadCart();
    loadAddresses();
  }, []);

 const loadCart = async () => {
  try {
    const res = await getCart();
    console.log("CART RESPONSE:", res.data);

    const normalizedCart = res.data.cartProducts.map(item => {
      const imgPath = item.productId.image?.[0]; // 👈 lowercase + array

      return {
        productId: item.productId._id,
        name: item.productId.Name,
        image: imgPath
          ? `${baseURL}${imgPath.replace(/\\/g, "/")}` // 👈 fix slashes
          : "",
        weight: item.productId.Weight || "",
        unitPrice: item.productId.Price,
        quantity: item.quantity,
        total: item.quantity * item.productId.Price
      };
    });

    setCart(normalizedCart);
  } catch (err) {
    console.error("Error fetching cart:", err);
  }
};




  const loadAddresses = async () => {
    try {
      const res = await getAddresses();
      setAddresses(res.data.allAddress || []);
    } catch (err) {
      console.log("Error fetching addresses:", err);
    }
  };

  const grandTotal = cart.reduce((sum, item) => sum + (item.total || 0), 0);

  const buildPayload = () => ({
    fullName: tempAddress.fullName,
    phone: tempAddress.phone,
    email: tempAddress.email,
    addressLine1: tempAddress.addressLine1,
    addressLine2: tempAddress.addressLine2,
    city: tempAddress.city,
    state: tempAddress.state,
    pincode: tempAddress.pincode,
    landmark: tempAddress.landmark,
    addressType: tempAddress.addressType,
    saveAddress: tempAddress.saveAddress,
  });

  // ---------------- Save or Update Address ----------------
  const handleSaveAddress = async () => {
    if (!tempAddress.fullName || !tempAddress.phone || !tempAddress.email || !tempAddress.addressLine1 || !tempAddress.city || !tempAddress.state || !tempAddress.pincode) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const payload = buildPayload();

      if (editingId) {
        const res = await updateAddress(editingId, payload);
        setAddresses(res.data.allAddress);
      } else {
        const res = await addNewAddress(payload);
        setAddresses(res.data.allAddress);
        setSelectedAddressIndex(res.data.allAddress.length - 1); // auto-select newly added
      }

      setTempAddress({
        fullName: "",
        phone: "",
        email: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
        addressType: "Home",
        saveAddress: false,
      });
      setEditingId(null);

    } catch (err) {
      console.log("Error saving address:", err);
    }
  };

  // ---------------- Delete Address ----------------
  const handleDeleteAddress = async (idx) => {
    if (!window.confirm("Delete this address?")) return;

    try {
      const res = await deleteAddress(addresses[idx]._id);
      setAddresses(res.data.allAddress);
      if (selectedAddressIndex === idx) setSelectedAddressIndex(null);
    } catch (err) {
      console.log("Error deleting address:", err);
    }
  };

  // ---------------- Use & Edit Address ----------------
  const handleUseAndEdit = (addr, idx) => {
    setEditingId(addr._id);
    setSelectedAddressIndex(idx);

    setTempAddress({
      fullName: addr.fullName,
      phone: addr.phone,
      email: addr.email,
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      landmark: addr.landmark,
      addressType: addr.addressType,
      saveAddress: addr.saveAddress || false,
    });
  };

  // // ---------------- Place Order ----------------
  // const handlePlaceOrder = () => {
  //   if (!cart.length) {
  //     alert("Cart empty");
  //     return;
  //   }

  //   const shippingAddress = selectedAddressIndex !== null ? addresses[selectedAddressIndex] : tempAddress;

  //   const order = {
  //     id: Date.now(),
  //     createdAt: new Date().toISOString(),
  //     items: cart,
  //     total: grandTotal,
  //     shippingAddress,
  //   };

  //   localStorage.setItem("lastOrder", JSON.stringify(order));
  //   setShowConfirm(true);
  // };

const handlePlaceOrder = async () => {
  if (!cart.length) {
    alert("Cart is empty");
    return;
  }

  let shippingAddress = selectedAddressIndex !== null
    ? addresses[selectedAddressIndex]
    : tempAddress;

  if (!shippingAddress._id && tempAddress.saveAddress) {
    // Save new address first
    const res = await addNewAddress(buildPayload());
    shippingAddress = res.data.allAddress[res.data.allAddress.length - 1];
    setAddresses(res.data.allAddress);
    setSelectedAddressIndex(res.data.allAddress.length - 1);
  }

  if (!shippingAddress._id) {
    alert("Please select or save a delivery address before placing the order.");
    return;
  }

  // const orderPayload = {
  //   orderId: Date.now().toString(),
  //   addressId: shippingAddress._id,
  //   items: cart.map(item => ({
  //     productId: item.productId,
  //     quantity: item.quantity
  //   })),
  //   totalAmount: grandTotal
  // };
  const orderPayload = {
  orderId: Date.now().toString(),
  addressId: shippingAddress._id,
  items: cart.map(item => ({
    productId: item.productId,  // ⭐ ALWAYS VALID NOW
    quantity: item.quantity
  })),
  totalAmount: grandTotal
};


  console.log("Order payload to send:", orderPayload);

  try {
    const res = await createOrder(orderPayload);
    console.log("Order created:", res.data);

    localStorage.setItem("lastOrder", JSON.stringify({
      id: orderPayload.orderId,
      items: cart,
      total: grandTotal,
      shippingAddress
    }));

    setShowConfirm(true);
    setOrderPlaced(true);

    // localStorage.removeItem("cart");
    setCart([]);
  } catch (err) {
  console.error("Error placing order:", err);

  alert(
    err.response?.data?.message ||
    err.response?.data?.msg ||
    err.message ||
    "Failed to place order"
  );
}
};




  const handleYes = () => {
    localStorage.removeItem("cart");
    setCart([]);
    setOrderPlaced(true);
    setTimeout(() => setShowConfirm(false), 2000);
  };

  const handleNo = () => setShowConfirm(false);

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>

      {/* REVIEW ITEMS */}
      <div className="checkout-card">
        <h3>Review Items</h3>
        {cart.length === 0 ? <p>Your cart is empty.</p> : (
          <>
            <div className="checkout-items">
              {cart.map((item, idx) => (
                <div key={idx} className="checkout-row">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.weight}</p>
                    <p>{item.quantity} × ₹{item.unitPrice} = ₹{item.total}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grand-total">Grand Total: ₹{grandTotal}</div>
          </>
        )}
      </div>

      {/* CHECKOUT FORM & SAVED ADDRESSES */}
      <div className="checkout-layout">
        <div className="checkout-left">
          <div className="checkout-card">
            <h3>Delivery Address</h3>
            <form onSubmit={(e) => e.preventDefault()} className="checkout-form">
              <input type="text" value={tempAddress.fullName} onChange={(e) => setTempAddress({ ...tempAddress, fullName: e.target.value })} placeholder="Full Name *" />
              <input type="number" value={tempAddress.phone} onChange={(e) => setTempAddress({ ...tempAddress, phone: e.target.value })} placeholder="Phone *" />
              <input type="email" value={tempAddress.email} onChange={(e) => setTempAddress({ ...tempAddress, email: e.target.value })} placeholder="Email *" />
              <input type="text" value={tempAddress.addressLine1} onChange={(e) => setTempAddress({ ...tempAddress, addressLine1: e.target.value })} placeholder="Address Line 1 *" />
              <input type="text" value={tempAddress.addressLine2} onChange={(e) => setTempAddress({ ...tempAddress, addressLine2: e.target.value })} placeholder="Address Line 2" />
              <input type="text" value={tempAddress.city} onChange={(e) => setTempAddress({ ...tempAddress, city: e.target.value })} placeholder="City *" />
              <input type="text" value={tempAddress.state} onChange={(e) => setTempAddress({ ...tempAddress, state: e.target.value })} placeholder="State *" />
              <input type="number" value={tempAddress.pincode} onChange={(e) => setTempAddress({ ...tempAddress, pincode: e.target.value })} placeholder="Pincode *" />
              <input type="text" value={tempAddress.landmark} onChange={(e) => setTempAddress({ ...tempAddress, landmark: e.target.value })} placeholder="Landmark" />
              <div className="inline-row">
                <select value={tempAddress.addressType} onChange={(e) => setTempAddress({ ...tempAddress, addressType: e.target.value })}>
                  <option>Home</option>
                  <option>Work</option>
                  <option>Other</option>
                </select>
                <label>
                  <input  type="checkbox" checked={tempAddress.saveAddress} onChange={(e) => setTempAddress({ ...tempAddress, saveAddress: e.target.checked })} />
                  Save this address
                </label>
              </div>
            </form>
          </div>
        </div>

        <div className="checkout-right">
          <div className="checkout-card">
            <h3>Saved Addresses</h3>
            {addresses.length === 0 ? <p>No saved addresses.</p> : (
              <ul className="address-list">
                {addresses.map((addr, idx) => (
                  <li key={idx} className={`address-item ${selectedAddressIndex === idx ? "selected" : ""}`}>
                    <label>
                      <input type="radio" checked={selectedAddressIndex === idx} onChange={() => setSelectedAddressIndex(idx)} />
                      <strong>{addr.addressType} — {addr.addressLine1}</strong>
                      <div>{addr.city} - {addr.pincode}</div>
                    </label>
                    <div className="address-actions">
                      <button  className="link-btn edit" onClick={() => handleUseAndEdit(addr, idx)}>Use & Edit</button>
                      <button className="link-btn danger" onClick={() => handleDeleteAddress(idx)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="checkout-card">
            <button className="primary-btn" onClick={handleSaveAddress}>
              {editingId ? "Update Address" : "Save Address"}
            </button>
          </div>
        </div>
      </div>

      <div className="place-order-wrap">
        <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-card">
            {!orderPlaced ? (
              <>
                <h3>Confirm your order?</h3>
                <button className="btn-yes" onClick={handleYes}>Yes</button>
                <button className="btn-no" onClick={handleNo}>No</button>
              </>
            ) : <h3 className="success-message">🎉 Order placed successfully!</h3>}
          </div>
        </div>
      )}
    </div>
  );
}
