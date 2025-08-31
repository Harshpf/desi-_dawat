// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ProductList from "../components/ProductList";
// import ProductForm from "../components/ProductForm";

// function ProductPage() {
//   const [products, setProducts] = useState([]);

//   const fetchProducts = async () => {
//     const res = await axios.get("http://localhost:5000/api/admin/product/getallproduct");
//     setProducts(res.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <h2>Products</h2>
//       <ProductForm fetchProducts={fetchProducts} />
//       <ProductList products={products} fetchProducts={fetchProducts} />
//     </div>
//   );
// }

// export default ProductPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/admin/product/getallproduct");
      // your backend returns an array (see your sample) -> store it
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>
      <ProductForm fetchProducts={fetchProducts} />
      {loading ? <p>Loading products…</p> : <ProductList products={products} fetchProducts={fetchProducts} />}
    </div>
  );
}

export default ProductPage;

