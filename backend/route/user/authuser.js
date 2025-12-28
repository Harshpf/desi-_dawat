const express = require("express")
const {validateUser} = require("../../middleware/authmiddleware")
const {login,signup,logout,userProfile} = require("../../controller/user/authcontroller");

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.put("/profile",userProfile);

module.exports = router;