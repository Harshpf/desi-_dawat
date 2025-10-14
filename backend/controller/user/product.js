const productModel = require("../../model/product")


exports.getProductsByCategory = async (req, res) => {
    try {
        const { category,tag } = req.params;
        console.log(category,tag);

        const products = await productModel.find({Category:category,Tag:tag})
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
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