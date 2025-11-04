const express = require("express");
const router = express.Router();
const {getProductsByCategory,getAllProducts,getProductById} = require("../../controller/user/product")

router.get("/category/:category/:tag", getProductsByCategory);
router.get("/allproducts",getAllProducts);
// router.get("/:id",getProductById);


module.exports = router;