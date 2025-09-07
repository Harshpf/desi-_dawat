const orderProductModel = require("../../model/order")
const orderUserModel =require("../../model/order")
const address = require("../../model/address")
const Product = require("../../model/product")

exports.newOrder = async(req,res)=>{
    try{
    const { userId, addressId, items } = req.body; 

    const address = await address.findById(addressId);
    if (!address) return res.status(400).json({ message: "Invalid address" });

    const shippingAddress = {
      fullName: address.userName,
      PhoneNumber:address.phoneNumber,
      address: address.address,
      city: address.city,
      state: address.state,
      district: address.district,
      pinCode: address.pinCode,
      country: address.country,
    };
    const saveDetails = new orderUserModel({
      user: userId,
      shippingAddress,
    });
    await saveDetails.save();


    let totalAmount = 0;
    const productDetails = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;

      productDetails.push({
        product: product._id,
        name: product.Name,       
        price: product.Price,     
        quantity: item.quantity,
      });

      totalAmount += product.Price * item.quantity;
    }


    const orderProduct = new orderProductModel({
      items: productDetails,
      totalAmount,
      paymentStatus: "pending",
      orderStatus: "pending",
    });

    await orderProduct.save();

    res.status(201).json({
      message: "Order created successfully",
      order,
      orderProduct,
    });
    }catch(err){
        res.status(500).json({msg:"error from addBasicOrderDetails",message:err.message});
    }
}


exports.orderUserDetail = async(req,res)=>{
  try{
      const Id = req.date.id;
      const userOrderDetails = await orderUserModel.findById(Id);
      res.status(200).status(userOrderDetails);
  }catch(error){
      res.status(500).json({msg:"error from orderUserDetaisl",message:err.message});
  }
}

exports.orderProductDetail = async(req,res)=>{
  try{
      const Id = req.date.id;
      const userOrderDetails = await orderUserModel.findById(Id);
      res.status(200).status(userOrderDetails);
  }catch(error){
      res.status(500).json({msg:"error from orderUserDetaisl",message:err.message});
  }
}