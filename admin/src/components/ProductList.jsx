

// import React from "react";
// import axios from "axios";
// import './ProductList.css'

// function ProductList({ products = [], fetchProducts }) {
//   // normalize (support both array or { products: [...] } shape)
//   const productArray = Array.isArray(products) ? products : (products && Array.isArray(products.products) ? products.products : []);

//   const deleteProduct = async (id) => {
//     if (!window.confirm("Delete this product?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/product/deleteproduct/${id}`);
//       fetchProducts();
//     } catch (err) {
//       console.error("Failed to delete product:", err);
//       alert("Failed to delete product");
//     }
//   };

//   const updateProduct = async (product) => {
//     // Simple prompt-based update (replace with modal/form if you want)
//     const newName = window.prompt("New product name:", product.Name);
//     if (newName === null) return;
//     const newPriceStr = window.prompt("New price:", String(product.Price));
//     if (newPriceStr === null) return;
//     const newPrice = Number(newPriceStr);

//     try {
//       await axios.put(`http://localhost:5000/api/admin/product/updateproduct/${product._id}`, {
//         Name: newName,
//         Price: newPrice,
//         Category: product.Category,
//         Description: product.Description,
//       });
//       fetchProducts();
//     } catch (err) {
//       console.error("Failed to update product:", err);
//       alert("Failed to update product");
//     }
//   };

//   if (!Array.isArray(productArray) || productArray.length === 0) {
//     return <div>No products found.</div>;
//   }

//   return (
//     <div className="product-list-container">
//       <h3 className="list-title">📦 Product List</h3>
//       <ul className="product-list">
//         {productArray.map((p) => {
//           const images = Array.isArray(p.image) ? p.image : [];
//           return (
//             <li key={p._id} className="product-item">
//               <div className="product-info">
//                 <div className="product-name">{p.Name}</div>
//                 <div className="product-price">Price: ₹{p.Price}</div>
//                 <div className="product-category">
//                   Category: {p.Category}
//                 </div>
//                 <div className="product-desc">{p.Description}</div>

//                 {images.length > 0 && (
//                   <div className="product-images">
//                     {images.map((imgPath, i) => {
//                       const fixed = imgPath.replace(/\\/g, "/");
//                       const url = encodeURI(
//                         `http://localhost:5000/${fixed}`
//                       );
//                       return (
//                         <img
//                           key={i}
//                           src={url}
//                           alt={`${p.Name}-${i}`}
//                           className="product-img"
//                         />
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>

//               <div className="action-buttons">
//                 <button
//                   className="update-btn"
//                   onClick={() => updateProduct(p)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="delete-btn"
//                   onClick={() => deleteProduct(p._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default ProductList;



import React from "react";
import axios from "axios";
import './ProductList.css'

function ProductList({ products = [], fetchProducts }) {
  // normalize (support both array or { products: [...] } shape)
  const productArray = Array.isArray(products)
    ? products
    : (products && Array.isArray(products.products) ? products.products : []);

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
    const newTag = window.prompt("New tag:", product.Tag || ""); // ✅ ask for tag

    try {
      await axios.put(
        `http://localhost:5000/api/admin/product/updateproduct/${product._id}`,
        {
          Name: newName,
          Price: newPrice,
          Category: product.Category,
          Description: product.Description,
          Tag: newTag, // ✅ include tag in update
        }
      );
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
    <div className="product-list-container">
      <h3 className="list-title">📦 Product List</h3>
      <ul className="product-list">
        {productArray.map((p) => {
          const images = Array.isArray(p.image) ? p.image : [];
          return (
            <li key={p._id} className="product-item">
              <div className="product-info">
                <div className="product-name">{p.Name}</div>
                <div className="product-price">Price: ₹{p.Price}</div>
                <div className="product-category">Category: {p.Category}</div>
                <div className="product-desc">{p.Description}</div>
                <div className="product-tag">Tag: {p.Tag || "—"}</div> {/* ✅ show tag */}

                {images.length > 0 && (
                  <div className="product-images">
                    {images.map((imgPath, i) => {
                      const fixed = imgPath.replace(/\\/g, "/");
                      const url = encodeURI(`http://localhost:5000/${fixed}`);
                      return (
                        <img
                          key={i}
                          src={url}
                          alt={`${p.Name}-${i}`}
                          className="product-img"
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="action-buttons">
                <button
                  className="update-btn"
                  onClick={() => updateProduct(p)}
                >
                  Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(p._id)}
                >
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


