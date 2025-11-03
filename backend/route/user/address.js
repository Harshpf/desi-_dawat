const express = require("express");
const { getAddress, addNewAddress, deleteAddress, updateAddress}  = require("../../controller/user/addresscontroller");
const router = express.Router();
const { validateUser } = require("../../middleware/authmiddleware")

router.get("/all",validateUser,getAddress);
router.post("/new",validateUser,addNewAddress);
router.delete("/delete/:id",validateUser,deleteAddress);
router.put("/update/:id",validateUser,updateAddress);

module.exports = router 