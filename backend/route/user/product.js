const express = require("express");
const router = express.Router();
const {getProductsByCategory,getAllProducts} = require("../../controller/user/product")

router.get("/category/:category", getProductsByCategory);
router.get("/getallproduct",getAllProducts);


module.exports = router;