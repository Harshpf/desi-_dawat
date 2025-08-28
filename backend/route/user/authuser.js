const express = require("express")
const {validateUser} = require("../../middleware/authmiddleware")
const {login,signup} = require("../../controller/user/authcontroller");

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
// router.get("/hii",validateUser,login)

module.exports = router;