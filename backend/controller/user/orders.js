// const {orderProductModel , orderUserModel} = require("../../model/order")
// const addressModel = require("../../model/address")
// const Product = require("../../model/product")

// exports.newOrder = async(req,res)=>{
//     try{
//     const {orderId, addressId, items ,totalAmount} = req.body; 
//     const userId = req.userId;

//     const address = await addressModel.findById(addressId);
//     if (!address) return res.status(400).json({ message: "Invalid address" });

//     const shippingAddress = {
//       fullName: address.userName,
//       PhoneNumber:address.phoneNumber,
//       address: address.address,
//       city: address.city,
//       state: address.state,
//       district: address.district,
//       pinCode: address.pinCode,
//       country: address.country,
//     };
//     const saveDetails = new orderUserModel({
//       _id:orderId,
//       userId: userId,
//       shippingAddress,
//     });
//     await saveDetails.save();


//     const productDetails = [];

//     for (const item of items) {
//       const product = await Product.findById(item.productId);
//       if (!product) continue;

//       productDetails.push({
//         product: product._id,
//         name: product.Name,       
//         price: product.Price,     
//         quantity: item.quantity,
//       });
//     }


//     const orderProduct = new orderProductModel({
//       _id:orderId,
//       items: productDetails,
//       totalAmount,
//       paymentStatus: "pending",
//       orderStatus: "pending",
//     });

//     await orderProduct.save();

//     res.status(201).json({
//       message: "Order created successfully",
//       saveDetails,
//       orderProduct,
//     });
//     }catch(err){
//         res.status(500).json({msg:"error while adding new order",message:err.message});
//     }
// }


// exports.orderUserDetail = async(req,res)=>{
//   try{
//      const Id = req.body.orderId;
//       const userOrderDetails = await orderUserModel.findById(Id);
     
//       if(!userOrderDetails){
//         return res.status(400).json("did found the userOrderData")
//       }

//       res.status(200).json(userOrderDetails);
//   }catch(error){
//       res.status(500).json({msg:"error from orderUserDetaisl",message:error.message});
//   }
// }

// exports.orderProductDetail = async(req,res)=>{
//   try{
//     const Id = req.body.orderId;
//     const orderProductDetail = await orderUserModel.findById(Id);
    
//      if(!orderProductDetail){
//         return res.status(400).json("did found the userOrderData")
//       }

//     res.status(200).json(orderProductDetail);
//   }catch(error){
//       res.status(500).json({msg:"error from orderUserDetaisl",message:error.message});
//   }
// }
// const { orderUserModel, orderProductModel } = require("../../model/order");
// const addressModel = require("../../model/address");
// const Product = require("../../model/product");

// // Create new order
// exports.newOrder = async (req, res) => {
//   try {
//     const { orderId, addressId, items, totalAmount } = req.body;
//     const userId = req.userId;

//     // Fetch address
//     const address = await addressModel.findById(addressId);
//     if (!address) return res.status(400).json({ message: "Invalid address" });

//  const shippingAddress = {
//   fullName: address.fullName,
//   phone: address.phone,
//   email: address.email,
//   addressLine1: address.addressLine1,
//   addressLine2: address.addressLine2 || "",
//   city: address.city,
//   state: address.state,
//   pincode: address.pincode,
//   landmark: address.landmark || "",
//   addressType: address.addressType || "Home",
// };


//     // Save user order (shipping details)
//     const saveDetails = new orderUserModel({
//       _id: orderId,
//       userId,
//       shippingAddress,
//     });
//     await saveDetails.save();

//     // Save product order
//     const productDetails = [];
//     for (const item of items) {
//       const product = await Product.findById(item.productId);
//       if (!product) continue;

//       productDetails.push({
//         product: product._id,
//         name: product.Name,
//         price: product.Price,
//         quantity: item.quantity,
//       });
//     }

//     const orderProduct = new orderProductModel({
//       _id: orderId,
//       items: productDetails,
//       totalAmount,
//       paymentStatus: "pending",
//       orderStatus: "pending",
//     });
//     await orderProduct.save();

//     res.status(201).json({
//       message: "Order created successfully",
//       saveDetails,
//       orderProduct,
//     });
//   } catch (err) {
//     console.log("ORDER ERROR:", err); 
//     res.status(500).json({ msg: "Error while adding new order", message: err.message });
//   }
// };
const { orderUserModel, orderProductModel } = require("../../model/order");
const addressModel = require("../../model/address");
const Product = require("../../model/product");



// Create new order
exports.newOrder = async (req, res) => {
  try {
    const { orderId, addressId, items, totalAmount } = req.body;
    const userId = req.userId;
     console.log(req.body);
    const address = await addressModel.findById(addressId);

    const shippingAddress = {
      fullName: address.fullName,
      phone: address.phone,
      email: address.email,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      landmark: address.landmark || "",
      addressType: address.addressType || "Home",
    };

    await orderUserModel.create({
      _id: orderId,
      userId,
      shippingAddress,
    });

    const productDetails = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;

      productDetails.push({
        product: product._id,
        name: product.Name,
        price: product.Price,
        quantity: item.quantity,
        image: product.image?.[0] || "",  // ⭐ THIS MAKES IMAGE SHOW IN UI
      });
    }

    await orderProductModel.create({
      _id: orderId,
      items: productDetails,
      totalAmount,
      paymentStatus: "pending",
      orderStatus: "pending",
    });

    res.status(201).json({ message: "Order created" });
  } catch (err) {
    res.status(500).json({ msg: "Order error", message: err.message });
  }
};

// Get order shipping details by orderId (URL param)
exports.orderUserDetail = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userOrderDetails = await orderUserModel.findById(orderId);

    if (!userOrderDetails) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.status(200).json(userOrderDetails);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching order user details", message: error.message });
  }
};

// Get order product details by orderId (URL param)
exports.orderProductDetail = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderProductDetail = await orderProductModel.findById(orderId);

    if (!orderProductDetail) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.status(200).json(orderProductDetail);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching order product details", message: error.message });
  }
};

// // Get all orders of logged-in user (latest first)
// exports.getAllOrders = async (req, res) => {
//   try {
//     const userId = req.userId;

//     const userOrders = await orderUserModel.find({ userId }).sort({ createdAt: -1 });
//     const orders = [];

//     for (const userOrder of userOrders) {
//       const productOrder = await orderProductModel.findById(userOrder._id);
//       orders.push({ userOrder, productOrder });
//     }

//     res.status(200).json({ orders });
//   } catch (err) {
//     res.status(500).json({ msg: "Error fetching orders", message: err.message });
//   }
// };
// exports.getAllOrders = async (req, res) => {
//   try {
//     const userId = req.userId;

//     const userOrders = await orderUserModel
//       .find({ userId })
//       .sort({ createdAt: -1 });

//     const orders = [];

//     for (const u of userOrders) {
//       const productOrder = await orderProductModel.findById(u._id);
//       orders.push({ userOrder: u, productOrder });
//     }

//     res.status(200).json({ orders });
//   } catch (err) {
//     res.status(500).json({
//       msg: "Error fetching orders",
//       message: err.message
//     });
//   }
// };
exports.getAllOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const userOrders = await orderUserModel
      .find({ userId })
      .sort({ createdAt: -1 });

    const orders = [];

    for (const u of userOrders) {
      const productOrder = await orderProductModel.findById(u._id);

      orders.push({
        userOrder: u,
        productOrder: productOrder || { items: [], totalAmount: 0, orderStatus: "pending" }
      });
    }

    res.status(200).json({ orders });

  } catch (err) {
    res.status(500).json({
      msg: "Error fetching orders",
      message: err.message,
    });
  }
};
