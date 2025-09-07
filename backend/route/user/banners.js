const express = require("express");
const {addBanner,deleteImage,getAllBanners} = require("../../controller/admin/addbanners")
const router = express.Router();

router.get("/getallbanner",getAllBanners);

module.exports = router;