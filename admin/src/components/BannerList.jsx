

// import React, { useState } from "react";
// import axios from "axios";
// import "./BannerList.css";


// function BannerList({ banners = [], fetchBanners }) {
//   const [deletingId, setDeletingId] = useState(null);

//   if (!Array.isArray(banners) || banners.length === 0) {
//     return <div>No banners found.</div>;
//   }

//   const deleteBanner = async (id) => {
//     if (!window.confirm("Delete this banner?")) return;
//     setDeletingId(id);
//     try {
//       // Primary route (based on mounting /api/admin + /banners)
//       await axios.delete(`http://localhost:5000/api/admin/banners/deletebanner/${id}`);
//       await fetchBanners();
//     } catch (err) {
//       // fallback to alternate route if primary 404s
//       if (err?.response?.status === 404) {
//         try {
//           await axios.delete(`http://localhost:5000/api/admin/deletebanner/${id}`);
//           await fetchBanners();
//         } catch (innerErr) {
//           console.error("Fallback delete failed:", innerErr);
//           alert("Failed to delete banner");
//         }
//       } else {
//         console.error("Failed to delete banner:", err);
//         alert("Failed to delete banner");
//       }
//     } finally {
//       setDeletingId(null);
//     }
//   };

//    return (
//     <div className="banner-list">
//       <h3>Banner List</h3>
//       <ul>
//         {banners.map((b) => {
//           const imgPath = b?.image ? b.image.replace(/\\/g, "/") : null;
//           const imgUrl = imgPath ? encodeURI(`http://localhost:5000/${imgPath}`) : null;

//           return (
//             <li key={b._id}>
//               <div className="banner-info">
//                 <strong>{b?.Name || "Untitled"}</strong>
//                 {b?._id && <small>ID: {b._id}</small>}
//               </div>

//               {imgUrl && <img src={imgUrl} alt={b?.Name || "banner"} />}

//               <button
//                 onClick={() => deleteBanner(b._id)}
//                 disabled={deletingId === b._id}
//               >
//                 {deletingId === b._id ? "Deleting..." : "Delete"}
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default BannerList;


import React, { useState } from "react";
import axios from "axios";
import "./BannerList.css";

function BannerList({ banners = [], fetchBanners }) {
  const [deletingId, setDeletingId] = useState(null);

  if (!Array.isArray(banners) || banners.length === 0) {
    return <div>No banners found.</div>;
  }

  const deleteBanner = async (id) => {
    if (!window.confirm("Delete this banner?")) return;
    setDeletingId(id);
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/banners/deletebanner/${id}`
      );
      await fetchBanners();
    } catch (err) {
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
    <div className="banner-list">
      <h3>Banner List</h3>
      <ul>
        {banners.map((b) => {
          const imgPath = b?.image ? b.image.replace(/\\/g, "/") : null;
          const imgUrl = imgPath ? encodeURI(`http://localhost:5000/${imgPath}`) : null;

          return (
            <li key={b._id}>
              <div className="banner-info">
                <strong>{b?.Name || "Untitled"}</strong>
                {b?.Tag && <span className="banner-tag">Tag: {b.Tag}</span>} {/* ✅ show tag */}
                {b?._id && <small>ID: {b._id}</small>}
              </div>

              {imgUrl && <img src={imgUrl} alt={b?.Name || "banner"} />}

              <button
                onClick={() => deleteBanner(b._id)}
                disabled={deletingId === b._id}
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


