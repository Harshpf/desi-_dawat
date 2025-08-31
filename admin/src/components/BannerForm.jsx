// import React, { useState } from "react";
// import axios from "axios";

// function BannerForm({ fetchBanners }) {
//   const [name, setName] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/admin/createbanner", {
//         Name: name,
//       });
//       setName("");
//       fetchBanners();
//     } catch (err) {
//       console.error("Failed to add banner:", err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//       <input
//         type="text"
//         value={name}
//         placeholder="Enter banner name"
//         onChange={(e) => setName(e.target.value)}
//       />
//       <button type="submit">Add Banner</button>
//     </form>
//   );
// }

// export default BannerForm;
import React, { useState } from "react";
import axios from "axios";

function BannerForm({ fetchBanners }) {
  const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Name", name);
      // formData.append("Description", description);
      if (image) {
        formData.append("images", image);
      }

      await axios.post("http://localhost:5000/api/admin/banners/addnewbanner", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});



      // Reset form
      setName("");
      // setDescription("");
      setImage(null);

      fetchBanners();
    } catch (err) {
      console.error("Failed to add banner:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={name}
        placeholder="Enter banner name"
        onChange={(e) => setName(e.target.value)}
        required
      />

   

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit">Add Banner</button>
    </form>
  );
}

export default BannerForm;
