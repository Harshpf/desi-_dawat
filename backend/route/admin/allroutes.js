const express = require("express");


const banner = require("./addbanner");
const product = require("./addproducts")
const router = express.Router();

router.use("/banners",banner);
router.use("/product",product);

module.exports  = router 
