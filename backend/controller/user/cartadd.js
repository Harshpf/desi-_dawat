const cartModel = require("../../model/cart");


exports.addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ msg: "Provide a productId" });
    }

    const findProduct = await cartModel.findOne({ userId, productId });
    if (findProduct) {
      return res.status(400).json({ msg: "Product already added" });
    }

    const cartProduct = new cartModel({ userId, productId });
    await cartProduct.save();
    res.status(200).json({ msg: "Product added to cart", cartProduct });
  } catch (error) {
    res.status(500).json({ msg: "Error from addToCart", message: error.message });
  }
};


exports.getCart = async (req, res) => {
  try {
    const userId = req.userId;
   const cartProducts = await cartModel
   .find({ userId })
   .populate({ path: "productId", select: "Name Price image" });

    if (!cartProducts || cartProducts.length === 0) {
      return res.status(200).json({ msg: "Cart is empty", cartProducts: [] });
    }

    res.status(200).json({ msg: "cartProducts", cartProducts });
  } catch (error) {
    res.status(500).json({ msg: "Error from getCart", message: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ msg: "Provide a productId" });
    }

    const deleteProduct = await cartModel.findOneAndDelete({ userId, productId });

    if (!deleteProduct) {
      return res.status(404).json({ msg: "Product not found in cart" });
    }

    res.status(200).json({ msg: "Product removed from cart", deleteProduct });
  } catch (error) {
    res.status(500).json({ msg: "Error from deleteProduct", message: error.message });
  }
};
