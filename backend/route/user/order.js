const express = require("express");
const router = express.Router();
const {newOrder,orderUserDetail,orderProductDetail} = require("../../controller/user/orders")
const {validateUser} = require("../../middleware/authmiddleware")


router.post("/new",validateUser,newOrder);
router.get("/userdetails",validateUser,orderUserDetail);
router.get("/productdetails",validateUser,orderProductDetail);




module.exports = router;