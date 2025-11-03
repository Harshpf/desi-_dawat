const express = require("express")
const {validateUser} = require("../../middleware/authmiddleware")
const {addToCart,getCart,deleteProduct,mergeCart} = require("../../controller/user/cartadd");

const router = express.Router();

router.post("/addtocart/:id",validateUser,addToCart);
router.get("/getcartproduct",validateUser,getCart);
router.delete("/deletecartproduct/:id",validateUser,deleteProduct);
router.post("/mergecart",validateUser,mergeCart);
module.exports = router;