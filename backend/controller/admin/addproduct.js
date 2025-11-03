const productModel = require("../../model/product");
const upload = require("../../middleware/multermiddleware")

exports.getProduct =async(req,res)=>{

    try{
    const allProducts = await productModel.find();
    res.status(200).json(allProducts);
    }catch(err){
        res.status(500).json({msg:"error in fetching product",message:err.message})
    }
}

exports.addProduct = [upload.array("image",5),async(req,res)=>{

    try{
        const data = req.body;
        
        const productExist = await productModel.findOne({Name:data.name});
        if(productExist){
            res.status(400).json("product already exist");
        }

      const imagePaths = req.files ? req.files.map(file => file.path) : [];

        const newProduct = new productModel({
            Name:data.Name,
            Price:data.Price,
            Category:data.Category,
            image :imagePaths,
            Description:data.Description,
            Tag:data.Tag?data.Tag:"null"
        });

       await newProduct.save();
       res.status(200).json({msg:"new product is added"});
    }catch(err){
        res.status(500).json({msg:"error adding a new product",message:err.message})
    }
}]

exports.updateProduct = [
  upload.array("image", 5),
  async (req, res) => {
    try {
      const productId = req.params.id;
      const data = req.body;

      if (req.files && req.files.length > 0) {
        data.image = req.files.map(file => file.path);
      }

      if (data.Name) {
        data.key = data.Name; 
      }

      const updatedProduct = await productModel.findByIdAndUpdate(
        productId,
        { $set: data },
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ msg: "Product does not exist" });
      }

      res.status(200).json({ msg: "Product updated successfully", product: updatedProduct });
    } catch (err) {
      res.status(500).json({ msg: "Error updating product", message: err.message });
    }
  }
];


// exports.updateProduct = [upload.array("image",5),async(req,res)=>{

//     try {
//         const data = req.body;
//         const productId = req.params.id;

//         const product = await productModel.findById(productId);
//         if (!product) {
//             return res.status(404).json({ msg: "Product does not exist" });
//         }

//         if (data.Name){
//          product.Name = data.Name;
//         product.key = data.Name;
//         }
//         if (data.Price) product.Price = data.Price;
//         if (data.Category) product.Category = data.Category;
//         if (data.Description) product.Description = data.Description;
//         if(data.tag)product.Tag=data.tag
//         if (req.files && req.files.length > 0) {
//             const imagePaths = req.files.map(file => file.path);
//             product.image = imagePaths;
//         }

//         await product.save();
//        res.status(200).json({msg:"product is updated"});
//     }catch(err){
//         res.status(500).json({msg:"error updateing new product",message:err.message})
//     }
// }];


exports.deleteProduct =async(req,res)=>{

     try{
        const productId = req.params.id
        const deleteproduct = await productModel.findByIdAndDelete({_id:productId});
        res.status(200).json({msg:"product deleted successfully"})
    }catch(err){
        res.status(500).json({msg:"error from deleteProduct",message:err.message})
    }
}