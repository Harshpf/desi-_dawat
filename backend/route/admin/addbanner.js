const express = require("express");
const {addBanner,deleteImage,getAllBanners} = require("../../controller/admin/addbanners")
const router = express.Router();

router.post("/addnewbanner",addBanner);
router.delete("/deletebanner/:id", deleteImage);
router.get("/getallbanner",getAllBanners);

module.exports = router;