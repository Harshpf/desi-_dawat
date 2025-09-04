import React, { useEffect, useState } from "react";
import "./Checkout.css";

// Single-page Checkout: Review (top) + Address form (left) + Saved Addresses (right)
export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState(
    JSON.parse(localStorage.getItem("addresses")) || []
  );

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(
    addresses.length > 0 ? 0 : null
  );

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

  // orderPlaced removed per request (don't show order confirmed)

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const grandTotal = cart.reduce((sum, item) => sum + (item.total || 0), 0);

  const handleSaveAddress = () => {
    const cleaned = { ...tempAddress };
    if (!cleaned.fullName || !cleaned.addressLine1 || !cleaned.city || !cleaned.pincode) {
      alert("Please fill required fields: Full name, Address line 1, City and Pincode.");
      return;
    }
    const updated = [...addresses, cleaned];
    setAddresses(updated);
    setSelectedAddressIndex(updated.length - 1);
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
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Cart empty");
      return;
    }

    let shippingAddress = null;
    if (selectedAddressIndex !== null) shippingAddress = addresses[selectedAddressIndex];

    // If no saved selected address, use form (tempAddress)
    if (!shippingAddress) {
      if (!tempAddress.fullName || !tempAddress.addressLine1 || !tempAddress.city || !tempAddress.pincode) {
        alert("Please select a saved address or fill the address form (Full name, Address, City, Pincode).");
        return;
      }
      shippingAddress = tempAddress;
      // Save if checkbox ticked
      if (tempAddress.saveAddress) {
        const updated = [...addresses, tempAddress];
        setAddresses(updated);
        setSelectedAddressIndex(updated.length - 1);
      }
    }

    const order = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      items: cart,
      total: grandTotal,
      shippingAddress,
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));
    // localStorage.removeItem("cart");
    // setCart([]);

    // NOTE: per your request we DO NOT show any "Order Confirmed" UI here
  };

  const handleDeleteAddress = (idx) => {
    if (!window.confirm("Delete this address?")) return;
    const updated = addresses.filter((_, i) => i !== idx);
    setAddresses(updated);
    if (updated.length === 0) setSelectedAddressIndex(null);
    else setSelectedAddressIndex(Math.max(0, idx - 1));
  };

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>

      {/* REVIEW (top) */}
      <div className="checkout-card">
        <h3>Review Items</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="checkout-items">
              {cart.map((item, idx) => (
                <div key={idx} className="checkout-row">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.weight}</p>
                    <p>
                      {item.quantity} × ₹{(item.unitPrice || 0).toFixed(2)} = ₹{(item.total || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grand-total">Grand Total: ₹{grandTotal.toFixed(2)}</div>
          </>
        )}
      </div>

      {/* TWO-COLUMN: LEFT = FORM, RIGHT = SAVED ADDRESSES + ACTIONS */}
      <div className="checkout-layout">
        {/* LEFT: Form */}
        <div className="checkout-left">
          <div className="checkout-card">
            <h3>Delivery Address</h3>
            <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
              <input value={tempAddress.fullName} onChange={(e) => setTempAddress({ ...tempAddress, fullName: e.target.value })} type="text" placeholder="Full Name *" />
              <input value={tempAddress.phone} onChange={(e) => setTempAddress({ ...tempAddress, phone: e.target.value })} type="text" placeholder="Phone" />
              <input value={tempAddress.email} onChange={(e) => setTempAddress({ ...tempAddress, email: e.target.value })} type="email" placeholder="Email" />

              <input value={tempAddress.addressLine1} onChange={(e) => setTempAddress({ ...tempAddress, addressLine1: e.target.value })} type="text" placeholder="Address Line 1 *" />
              <input value={tempAddress.addressLine2} onChange={(e) => setTempAddress({ ...tempAddress, addressLine2: e.target.value })} type="text" placeholder="Address Line 2" />

              <input value={tempAddress.city} onChange={(e) => setTempAddress({ ...tempAddress, city: e.target.value })} type="text" placeholder="City *" />
              <input value={tempAddress.state} onChange={(e) => setTempAddress({ ...tempAddress, state: e.target.value })} type="text" placeholder="State" />
              <input value={tempAddress.pincode} onChange={(e) => setTempAddress({ ...tempAddress, pincode: e.target.value })} type="text" placeholder="Pincode *" />
              <input value={tempAddress.landmark} onChange={(e) => setTempAddress({ ...tempAddress, landmark: e.target.value })} type="text" placeholder="Landmark" />

              <div className="inline-row">
                <select value={tempAddress.addressType} onChange={(e) => setTempAddress({ ...tempAddress, addressType: e.target.value })}>
                  <option>Home</option>
                  <option>Work</option>
                  <option>Other</option>
                </select>

                <label className="save-checkbox">
                  <input type="checkbox" checked={tempAddress.saveAddress} onChange={(e) => setTempAddress({ ...tempAddress, saveAddress: e.target.checked })} /> Save this address
                </label>
              </div>

            </form>
          </div>
        </div>

        {/* RIGHT: Saved Addresses + Actions (NO Order Summary) */}
        <div className="checkout-right">
          <div className="checkout-card">
            <h3>Saved Addresses</h3>
            {addresses.length === 0 ? (
              <p>No saved addresses yet.</p>
            ) : (
              <ul className="address-list">
                {addresses.map((addr, i) => (
                  <li key={i} className={`address-item ${selectedAddressIndex === i ? 'selected' : ''}`}>
                    <label style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                      <input type="radio" name="selectedAddress" checked={selectedAddressIndex === i} onChange={() => setSelectedAddressIndex(i)} />
                      <div>
                        {/* show addressType and house/line1 instead of full name */}
                        <strong>{addr.addressType} — {addr.addressLine1}</strong>
                        <div style={{fontSize: 13}}>{addr.city} — {addr.pincode}</div>
                      </div>
                    </label>
                    <div className="address-actions">
                      <button className="link-btn" onClick={() => { setTempAddress(addr); setSelectedAddressIndex(null); }}>Use & Edit</button>
                      <button className="link-btn danger" onClick={() => handleDeleteAddress(i)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="checkout-card">
            <div className="checkout-actions" style={{justifyContent: 'flex-start'}}>
              <button className="primary-btn" onClick={handleSaveAddress}>Save Address</button>
            </div>
          </div>

        </div>
      </div>

     {/* Place Order button shown at the bottom (centered, wide, green) */}
<div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
  <button className="place-order-btn" onClick={handlePlaceOrder}>
    Place Order
  </button>
</div>


    </div>
  );
}
