// import React from "react";
// import axios from "axios";

// function ProductList({ products = {}, fetchProducts }) {
//   const deleteProduct = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/product/deleteproduct/${id}`);
//       fetchProducts();
//     } catch (err) {
//       console.error("Failed to delete product:", err);
//     }
//   };

//     const banners = products.banners || [];


//   if (!Array.isArray(banners) || banners.length ===0) {
//     return <div>No products found.</div>;
//   }

//   return (
//     <div>
//       <h3>Product List</h3>
//       <ul>
//         {banners.map((p) => (
//           <li key={p._id}>
//             {p.Name} - ${p.Price}{" "}
//             <button onClick={() => deleteProduct(p._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProductList;

import React from "react";
import axios from "axios";

function ProductList({ products = [], fetchProducts }) {
  // normalize (support both array or { products: [...] } shape)
  const productArray = Array.isArray(products) ? products : (products && Array.isArray(products.products) ? products.products : []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/product/deleteproduct/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product");
    }
  };

  const updateProduct = async (product) => {
    // Simple prompt-based update (replace with modal/form if you want)
    const newName = window.prompt("New product name:", product.Name);
    if (newName === null) return;
    const newPriceStr = window.prompt("New price:", String(product.Price));
    if (newPriceStr === null) return;
    const newPrice = Number(newPriceStr);

    try {
      await axios.put(`http://localhost:5000/api/admin/product/updateproduct/${product._id}`, {
        Name: newName,
        Price: newPrice,
        Category: product.Category,
        Description: product.Description,
      });
      fetchProducts();
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("Failed to update product");
    }
  };

  if (!Array.isArray(productArray) || productArray.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div>
      <h3>Product List</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {productArray.map((p) => {
          const images = Array.isArray(p.image) ? p.image : [];
          return (
            <li key={p._id} style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #eee" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{p.Name}</div>
                <div>Price: ₹{p.Price}</div>
                <div>Category: {p.Category}</div>
                <div style={{ fontSize: 13, color: "#444" }}>{p.Description}</div>

                <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                  {images.map((imgPath, i) => {
                    const fixed = imgPath.replace(/\\/g, "/");
                    const url = encodeURI(`http://localhost:5000/${fixed}`);
                    return (
                      <img key={i} src={url} alt={`${p.Name}-${i}`} style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 6 }} />
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button onClick={() => updateProduct(p)}>Update</button>
                <button onClick={() => deleteProduct(p._id)} style={{ background: "#e74c3c", color: "#fff" }}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductList;

