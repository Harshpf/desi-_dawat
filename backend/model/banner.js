// const mongoose = require("mongoose");

// const bannerSchema = new mongoose.Schema({
//   banners: {
//     type: [
//       {
//         Name: { type: String, required: true },
//         image: { type: String, required: true },
//       },
//     ],
//     default: [], 
//   },
// });


// const bannerModel = mongoose.models.banners || mongoose.model("banners", bannerSchema);

// module.exports = bannerModel;


const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  image: { type: String, required: true },
});

const Banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);
module.exports = Banner;
