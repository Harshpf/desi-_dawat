const express = require("express");
const {validateUser} = require("../../middleware/authmiddleware")
const {deleteCategory,addCategory,getCategories,updateCategory} = require("../../controller/user/category");

const router = express.Router();

router.post("/new",addCategory);
router.get("/",getCategories);
router.delete("/delete/:id",deleteCategory);
router.patch("/update/:id",updateCategory);

module.exports = router;