
// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import "./ProductForm.css"; 


// function ProductForm({ fetchProducts }) {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState([]);       // File objects
//   const [previews, setPreviews] = useState([]);   // preview URLs
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     if (images.length === 0) {
//       setPreviews([]);
//       return;
//     }
//     const urls = images.map((f) => URL.createObjectURL(f));
//     setPreviews(urls);
//     return () => urls.forEach((u) => URL.revokeObjectURL(u));
//   }, [images]);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files || []);
//     setImages(files);
//   };

//   const resetForm = () => {
//     setName("");
//     setPrice("");
//     setCategory("");
//     setDescription("");
//     setImages([]);
//     setPreviews([]);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("Name", name);
//       formData.append("Price", price);
//       formData.append("Category", category);
//       formData.append("Description", description);

//       // append multiple files under same field name "images"
//       images.forEach((file) => formData.append("image", file));

//       await axios.post("http://localhost:5000/api/admin/product/addnewproduct", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       resetForm();
//       fetchProducts();
//     } catch (err) {
//       console.error("Failed to add product:", err);
//       // alert("Failed to add product");
//     }
//   };

//    return (
//     <form onSubmit={handleSubmit} className="product-form">
//       <h3 className="form-title">➕ Add Product</h3>

//       <input
//         type="text"
//         value={name}
//         placeholder="Enter product name"
//         onChange={(e) => setName(e.target.value)}
//         required
//       />

//       <input
//         type="number"
//         value={price}
//         placeholder="Enter product price"
//         onChange={(e) => setPrice(e.target.value)}
//         required
//       />

//       <select value={category} onChange={(e) => setCategory(e.target.value)} required>
//         <option value="">Select Category</option>
//         <option value="dryfruits">Dry Fruits</option>
//         <option value="snacks">Snacks</option>
//         <option value="desibiscuits">Desi Biscuits</option>
//         <option value="dryfruitssweets">Dry Fruits Sweets</option>
//         <option value="sugarlesssweets">Sugarless Sweets</option>
//         <option value="festivalsweets">Festival Sweets</option>
//         <option value="gifting">Gifting</option>
//         <option value="specialcategory">Special Category</option>
//       </select>

//       <textarea
//         value={description}
//         placeholder="Enter product description"
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       />

//       <label className="file-label">
//         Upload Images
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleFileChange}
//         />
//       </label>

//       {previews.length > 0 && (
//         <div className="preview-container">
//           {previews.map((src, idx) => (
//             <img
//               key={idx}
//               src={src}
//               alt={`preview-${idx}`}
//               className="preview-img"
//             />
//           ))}
//         </div>
//       )}

//       <button type="submit" className="submit-btn">Add Product</button>
//     </form>
//   );
// }

// export default ProductForm;


import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ProductForm.css"; 

function ProductForm({ fetchProducts }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");             // ✅ single tag field
  const [images, setImages] = useState([]);       
  const [previews, setPreviews] = useState([]);   
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (images.length === 0) {
      setPreviews([]);
      return;
    }
    const urls = images.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [images]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setTag("");   // ✅ reset tag
    setImages([]);
    setPreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("Price", price);
      formData.append("Category", category);
      formData.append("Description", description);
      formData.append("Tag", tag);   // ✅ send as single tag

      images.forEach((file) => formData.append("image", file));

      await axios.post("http://localhost:5000/api/admin/product/addnewproduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3 className="form-title">➕ Add Product</h3>

      <input
        type="text"
        value={name}
        placeholder="Enter product name"
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        value={price}
        placeholder="Enter product price"
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        <option value="dryfruits">Dry Fruits</option>
        <option value="snacks">Snacks</option>
        <option value="desibiscuits">Desi Biscuits</option>
        <option value="dryfruitssweets">Dry Fruits Sweets</option>
        <option value="sugarlesssweets">Sugarless Sweets</option>
        <option value="festivalsweets">Festival Sweets</option>
        <option value="gifting">Gifting</option>
        <option value="specialcategory">Special Category</option>
      </select>

      <textarea
        value={description}
        placeholder="Enter product description"
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      {/* ✅ New single Tag input */}
      <input
        type="text"
        value={tag}
        placeholder="Enter tag"
        onChange={(e) => setTag(e.target.value)}
      />

      <label className="file-label">
        Upload Images
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </label>

      {previews.length > 0 && (
        <div className="preview-container">
          {previews.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`preview-${idx}`}
              className="preview-img"
            />
          ))}
        </div>
      )}

      <button type="submit" className="submit-btn">Add Product</button>
    </form>
  );
}

export default ProductForm;


