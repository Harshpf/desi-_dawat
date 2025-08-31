// import React from "react";
// import axios from "axios";

// function BannerList({ banners = [], fetchBanners }) {
//   const deleteBanner = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/deletebanner/${id}`);
//       fetchBanners();
//     } catch (err) {
//       console.error("Failed to delete banner:", err);
//     }
//   };

//   if (!Array.isArray(banners)) {
//     return <div>No banners found.</div>;
//   }

//   return (
//     <div>
//       <h3>Banner List</h3>
//       <ul>
//         {banners.map((b) => (
//           <li key={b._id}>
//             {b.Name}{" "}
//             <button onClick={() => deleteBanner(b._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default BannerList;

import React, { useState } from "react";
import axios from "axios";

function BannerList({ banners = [], fetchBanners }) {
  const [deletingId, setDeletingId] = useState(null);

  if (!Array.isArray(banners) || banners.length === 0) {
    return <div>No banners found.</div>;
  }

  const deleteBanner = async (id) => {
    if (!window.confirm("Delete this banner?")) return;
    setDeletingId(id);
    try {
      // Primary route (based on mounting /api/admin + /banners)
      await axios.delete(`http://localhost:5000/api/admin/banners/deletebanner/${id}`);
      await fetchBanners();
    } catch (err) {
      // fallback to alternate route if primary 404s
      if (err?.response?.status === 404) {
        try {
          await axios.delete(`http://localhost:5000/api/admin/deletebanner/${id}`);
          await fetchBanners();
        } catch (innerErr) {
          console.error("Fallback delete failed:", innerErr);
          alert("Failed to delete banner");
        }
      } else {
        console.error("Failed to delete banner:", err);
        alert("Failed to delete banner");
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h3>Banner List</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {banners.map((b) => {
          // normalize path (Windows -> URL friendly) and encode it
          const imgPath = b?.image ? b.image.replace(/\\/g, "/") : null;
          const imgUrl = imgPath ? encodeURI(`http://localhost:5000/${imgPath}`) : null;

          return (
            <li
              key={b._id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "8px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div style={{ flex: 1 }}>
                <strong>{b?.Name || "Untitled"}</strong>
                {b?._id && <div style={{ fontSize: 12, color: "#666" }}>ID: {b._id}</div>}
              </div>

              {imgUrl && (
                <img
                  src={imgUrl}
                  alt={b?.Name || "banner image"}
                  style={{ width: 120, height: "auto", objectFit: "cover", borderRadius: 6 }}
                />
              )}

              <button
                onClick={() => deleteBanner(b._id)}
                disabled={deletingId === b._id}
                style={{
                  padding: "6px 10px",
                  background: deletingId === b._id ? "#ddd" : "#e74c3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  cursor: deletingId === b._id ? "not-allowed" : "pointer",
                }}
                aria-disabled={deletingId === b._id}
              >
                {deletingId === b._id ? "Deleting..." : "Delete"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BannerList;

