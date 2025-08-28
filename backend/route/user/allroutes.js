const express = require("express");

const router = express.Router();

const address = require("./address");
const auth = require("./authuser")
const cart = require("./cart");
const product = require("./product")

router.use("/address",address)
router.use("/auth",auth);
router.use("/cart",cart);
router.use("/product",product);

module.exports  = router 
