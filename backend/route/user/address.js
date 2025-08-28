const express = require("express");
const { getAddress, addNewAddress, deleteAddress, updateAddress}  = require("../../controller/user/addresscontroller");
const router = express.Router();
const { validateUser } = require("../../middleware/authmiddleware")

router.get("/allAddress",validateUser,getAddress);
router.post("/addAddress",validateUser,addNewAddress);
router.delete("/deleteAddress/:id",validateUser,deleteAddress);
router.put("/updateAddress/:id",validateUser,updateAddress);

module.exports = router 