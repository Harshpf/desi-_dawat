
// import React, { useState } from "react";
// import axios from "axios";
// import "./BannerForm.css";


// function BannerForm({ fetchBanners }) {
//   const [name, setName] = useState("");
//   // const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("Name", name);
//       // formData.append("Description", description);
//       if (image) {
//         formData.append("images", image);
//       }

//       await axios.post("http://localhost:5000/api/admin/banners/addnewbanner", formData, {
//   headers: { "Content-Type": "multipart/form-data" },
// });



//       // Reset form
//       setName("");
//       // setDescription("");
//       setImage(null);

//       fetchBanners();
//     } catch (err) {
//       console.error("Failed to add banner:", err);
//     }
//   };

//   return (
//         <div className="banner-form">
//       <h2>Add New Banner</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           placeholder="Enter banner name"
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//         />

//         <button type="submit">Add Banner</button>
//       </form>
//     </div>
//   );
// }

// export default BannerForm;


import React, { useState } from "react";
import axios from "axios";
import "./BannerForm.css";

function BannerForm({ fetchBanners }) {
  const [name, setName] = useState("");
  const [tag, setTag] = useState(""); // ✅ added tag state
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("Tag", tag); // ✅ include tag
      if (image) {
        formData.append("images", image);
      }

      await axios.post(
        "http://localhost:5000/api/admin/banners/addnewbanner",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Reset form
      setName("");
      setTag(""); // ✅ reset tag
      setImage(null);

      fetchBanners();
    } catch (err) {
      console.error("Failed to add banner:", err);
    }
  };

  return (
    <div className="banner-form">
      <h2>Add New Banner</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Enter banner name"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          value={tag}
          placeholder="Enter banner tag"
          onChange={(e) => setTag(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Add Banner</button>
      </form>
    </div>
  );
}

export default BannerForm;

