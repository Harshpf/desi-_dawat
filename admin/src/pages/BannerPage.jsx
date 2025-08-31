// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import BannerForm from "../components/BannerForm";   // ✅ Capitalized
// import BannerList from "../components/BannerList";

// function BannerPage() {
//   const [banners, setBanners] = useState([]);

//   const fetchBanners = async () => {
//     const res = await axios.get("http://localhost:5000/api/admin/banners/getallbanner");
//     setBanners(res.data);
//   };

//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   return (
//     <div>
//       <h2>Banners</h2>
//       <BannerForm fetchBanners={fetchBanners} />
//       <BannerList banners={banners} fetchBanners={fetchBanners} />
//     </div>
//   );
// }

// export default BannerPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import BannerForm from "../components/BannerForm";
import BannerList from "../components/BannerList";

function BannerPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBanners = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/api/admin/banners/getallbanner");
      // res.data is { banners: [...] } according to your response — store the inner array
      setBanners(res.data?.banners || []);
    } catch (err) {
      console.error("Error fetching banners:", err);
      setError("Failed to load banners");
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Banners</h2>

      {loading && <p>Loading banners…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <BannerForm fetchBanners={fetchBanners} />
      <BannerList banners={banners} fetchBanners={fetchBanners} />
    </div>
  );
}

export default BannerPage;

