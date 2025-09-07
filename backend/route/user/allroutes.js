const express = require("express");

const router = express.Router();

const address = require("./address");
const auth = require("./authuser")
const cart = require("./cart");
const product = require("./product")
const banners = require("./banners")

router.use("/address",address)
router.use("/auth",auth);
router.use("/cart",cart);
router.use("/product",product);
router.use("/banners",banners)

module.exports  = router 
