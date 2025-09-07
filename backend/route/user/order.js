const express = require("express");
const router = express.Router();
const {newOrder,orderUserDetail,orderProductDetail} = require("../../controller/user/orders")
const {validateUser} = require("../../middleware/authmiddleware")


router.post("/newOder",validateUser,newOrder);
router.get("/orderUserDetails",validateUser,orderUserDetail);
router.get("/orderproductDetails",validateUser,orderProductDetail);




module.exports = router;