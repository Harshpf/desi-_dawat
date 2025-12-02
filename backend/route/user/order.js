const express = require("express");
const router = express.Router();
const {newOrder,orderUserDetail,orderProductDetail,getAllOrders} = require("../../controller/user/orders")
const {validateUser} = require("../../middleware/authmiddleware")


router.post("/new",validateUser,newOrder);
router.get("/userdetails",validateUser,orderUserDetail);
router.get("/productdetails",validateUser,orderProductDetail);
// Get all orders of logged-in user
router.get("/all", validateUser, getAllOrders);




module.exports = router;