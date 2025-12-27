const productModel = require("../../model/product")


// exports.getProductsByCategory = async (req, res) => {
//     try {
//         const { category,tag } = req.params;
//         console.log(category)

//         const products = await productModel.find({Category:category,Tag:tag})
//         if(!products){
//             return res.status(200).json(products);
//         }
//         res.status(200).json({msg:"all products ",products});
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category, tag } = req.params;
    console.log("Requested category:", category, "Tag:", tag);

    let filter = {};

    if(category ==="null"){
      filter.Tag = tag; 
    }
    else{
   // category == NULL , tag   
   // tag == NULL , category  - filter{category , NULL} 
   //category and tag -{}

    // if(category !=="null"){
    //   filter.Category = category;  
    // }
    // if (tag !== "null") {
    //   filter.Tag = tag;
    // }
          filter.Category = category;  
                filter.Tag = tag;


   
  }
   console.log(filter);
    const products = await productModel.find(filter);

    return res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        console.log("fetching from all products");
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({msg:"err from get all product", error: error.message });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}