const productModel = require("../../model/product")


exports.getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await productModel.find({ Category: { $regex: new RegExp("^" + category + "$", "i") } });
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