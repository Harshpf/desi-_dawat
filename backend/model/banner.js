const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  image: { type: String, required: true },
  tag:{type:String}
});

const Banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);
module.exports = Banner;
