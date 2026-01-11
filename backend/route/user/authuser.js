const express = require("express")
const {validateUser} = require("../../middleware/authmiddleware");
const {verifymailToken} = require("../../middleware/verifymailtoken");
const {login,signup,logout,userProfile,sendmail} = require("../../controller/user/authcontroller");

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.put("/userProfile",userProfile);
router.post("/sendmail",sendmail);
router.put("/verifyandupdateemail",verifymailToken,userProfile);

module.exports = router;
