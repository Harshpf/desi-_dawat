const productModel = require("../../model/product");
const upload = require("../../middleware/multermiddleware")

exports.getProduct =async(req,res)=>{

    try{
    const allProducts = await productModel.find();
    res.status(200).json(allProducts);
    }catch(err){
        res.status(500).json({msg:"",message:err.message})
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
            key:data.Name
        });

       await newProduct.save();
       res.status(200).json({msg:"product is added"});
    }catch(err){
        res.status(500).json({msg:"error adding new product",message:err.message})
    }
}]



exports.updateProduct = [upload.array("image",5),async(req,res)=>{

    try {
        const data = req.body;
        const productId = req.params.id;

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product does not exist" });
        }

        if (data.Name){
         product.Name = data.Name;
        product.key = data.Name;
        }
        if (data.Price) product.Price = data.Price;
        if (data.Category) product.Category = data.Category;
        if (data.Description) product.Description = data.Description;

        if (req.files && req.files.length > 0) {
            const imagePaths = req.files.map(file => file.path);
            product.image = imagePaths;
        }

        await product.save();
       res.status(200).json({msg:"product is updated"});
    }catch(err){
        res.status(500).json({msg:"error updateing new product",message:err.message})
    }
}];


exports.deleteProduct =async(req,res)=>{

     try{
        const productId = req.params.id
        const deleteproduct = await productModel.findByIdAndDelete({_id:productId});
        res.status(200).json({msg:"product deleted"})
    }catch(err){
        res.status(500).json({msg:"error from deleteProduct",message:err.message})
    }
}