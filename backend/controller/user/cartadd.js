const cartModel = require("../../model/cart");
const mongoose = require('mongoose');


exports.addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = req.params.id;
  
    productObjectId = new mongoose.Types.ObjectId(productId);

    if (!productId) {
      return res.status(400).json({ msg: "Provide a productId" });
    }

    const cart = await cartModel.findOne({userId:userId});

    if(!cart){
      const newCart = new cartModel({
        userId,
        cartProducts:[productObjectId]
      });
      
     await newCart.save();
    }
    else{

      const productindex = cart.cartProducts.findIndex(
        item => item.toString() === productObjectId.toString()
      );

      if(productindex!=-1){
        return res.status(400).json({ msg: "Product already added" });
      }
      else{
        cart.cartProducts.push(productObjectId);
      }
      await cart.save()
    }
  
  return res.status(200).json({ msg: "Product added to cart", cart});

    }catch (error) {
    res.status(500).json({ msg: "Error from addToCart", message: error.message });
  }
};


// exports.getCart = async (req, res) => {
//   try {
//     const userId = req.userId;
//    const cartProducts = await cartModel
//    .find({ userId })
//    .populate({ path: "productId", select: "Name Price image" });

//     if (!cartProducts || cartProducts.length === 0) {
//       return res.status(200).json({ msg: "Cart is empty", cartProducts: [] });
//     }

//     res.status(200).json({ msg: "cartProducts", cartProducts });
//   } catch (error) {
//     res.status(500).json({ msg: "Error from getCart", message: error.message });
//   }
// };


// exports.deleteProduct = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const productId = req.params.id;

//     if (!productId) {
//       return res.status(400).json({ msg: "Provide a productId" });
//     }

//     const deleteProduct = await cartModel.findOneAndDelete({ userId, productId });

//     if (!deleteProduct) {
//       return res.status(404).json({ msg: "Product not found in cart" });
//     }

//     res.status(200).json({ msg: "Product removed from cart", deleteProduct });
//   } catch (error) {
//     res.status(500).json({ msg: "Error from deleteProduct", message: error.message });
//   }
// };

// exports.mergeCart = async(req,res) =>{
//   try{
//     const userId = req.userId;
//     const productArray = req.body.productArray;

//     const cart = await cartModel.findOne({userId:userId});

//      if(!cart){
//       const newcart = cartModel({
//         userId,
//         cartProduts : 
//       });
      
//      await cartProduct.save();
//     }
//     else{

//       for(productId in productArray){
//        const productindex = cart.cartProducts.findIndex(
//         item =>item.toString() === productId.toString()
//        );

//        if(productindex==-1){
//         cart.cartProducts.push(productId);
//        }
//       }
//     }
//     res.status(200).json({msg:"cart merged sucessfully",cart});
//   }catch(error){
//     res.status(500).json({msg:"error from merge",message:error.message})
//   }
// }


// ================== Add To Cart ==================
// Already working, no change needed

// ================== Get Cart ==================
exports.getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await cartModel
      .findOne({ userId })
      .populate({ path: "cartProducts.productId", select: "Name Price image" });

    if (!cart || cart.cartProducts.length === 0) {
      return res.status(200).json({ msg: "Cart is empty", cartProducts: [] });
    }

    res.status(200).json({ msg: "Cart retrieved successfully", cartProducts: cart.cartProducts });
  } catch (error) {
    res.status(500).json({ msg: "Error from getCart", message: error.message });
  }
};

// ================== Delete Product from Cart ==================
// exports.deleteProduct = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const productId = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//       return res.status(400).json({ msg: "Invalid productId" });
//     }

//     const cart = await cartModel.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ msg: "Cart not found" });
//     }

//     // Remove product from cartProducts array
    
//     const index = cart.cartProducts.findIndex(
//   item => item.productId.toString() === productId.toString()
// );


//     if (index === -1) {
//       return res.status(404).json({ msg: "Product not found in cart" });
//     }

//     cart.cartProducts.splice(index, 1);
//     await cart.save();

//     res.status(200).json({ msg: "Product removed from cart", cart });
//   } catch (error) {
//     res.status(500).json({ msg: "Error from deleteProduct", message: error.message });
//   }
// };
   exports.deleteProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ msg: "Invalid productId" });
    }

    const cart = await cartModel.findOne({ userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    // ✅ FIX HERE
    const index = cart.cartProducts.findIndex(
      (item) => item.toString() === productId.toString()
    );

    if (index === -1)
      return res.status(404).json({ msg: "Product not found in cart" });

    cart.cartProducts.splice(index, 1);
    await cart.save();

    res.status(200).json({ msg: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({
      msg: "Error from deleteProduct",
      message: error.message,
    });
  }
};

// ================== Merge Cart ==================
exports.mergeCart = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId)
    const productArray = req.body.productArray; // Array of productIds

    if (!Array.isArray(productArray) || productArray.length === 0) {
      return res.status(400).json({ msg: "Provide an array of productIds" });
    }

    // Convert all productIds to ObjectId and validate
    const validProductIds = productArray
      .filter(id => mongoose.Types.ObjectId.isValid(id))
      .map(id => new mongoose.Types.ObjectId(id));

    if (validProductIds.length === 0) {
      return res.status(400).json({ msg: "No valid productIds provided" });
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      // If no cart, create new cart
      cart = new cartModel({
        userId,
        cartProducts: validProductIds
      });
      await cart.save();
    } else {
      // If cart exists, push only new products
      validProductIds.forEach(prodId => {
        if (!cart.cartProducts.some(item => item.toString() === prodId.toString())) {
          cart.cartProducts.push(prodId);
        }
      });
      await cart.save();
    }

    res.status(200).json({ msg: "Cart merged successfully", cart });
  } catch (error) {
    res.status(500).json({ msg: "Error from mergeCart", message: error.message });
  }
};
