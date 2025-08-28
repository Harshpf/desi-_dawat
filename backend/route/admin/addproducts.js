const express = require("express");
const {getProduct,addProduct,updateProduct,deleteProduct} = require("../../controller/admin/addproduct")
const router = express.Router();

router.post("/addnewproduct",addProduct,);
router.get("/getallproduct",getProduct);
router.put("/updateproduct/:id",updateProduct);
router.delete("/deleteproduct/:id",deleteProduct);

module.exports = router;
