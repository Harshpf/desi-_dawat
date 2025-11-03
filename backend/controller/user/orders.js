const {orderProductModel , orderUserModel} = require("../../model/order")
const addressModel = require("../../model/address")
const Product = require("../../model/product")

exports.newOrder = async(req,res)=>{
    try{
    const {orderId, addressId, items ,totalAmount} = req.body; 
    const userId = req.userId;

    const address = await addressModel.findById(addressId);
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
      _id:orderId,
      userId: userId,
      shippingAddress,
    });
    await saveDetails.save();


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
    }


    const orderProduct = new orderProductModel({
      _id:orderId,
      items: productDetails,
      totalAmount,
      paymentStatus: "pending",
      orderStatus: "pending",
    });

    await orderProduct.save();

    res.status(201).json({
      message: "Order created successfully",
      saveDetails,
      orderProduct,
    });
    }catch(err){
        res.status(500).json({msg:"error while adding new order",message:err.message});
    }
}


exports.orderUserDetail = async(req,res)=>{
  try{
     const Id = req.body.orderId;
      const userOrderDetails = await orderUserModel.findById(Id);
     
      if(!userOrderDetails){
        return res.status(400).json("did found the userOrderData")
      }

      res.status(200).json(userOrderDetails);
  }catch(error){
      res.status(500).json({msg:"error from orderUserDetaisl",message:error.message});
  }
}

exports.orderProductDetail = async(req,res)=>{
  try{
    const Id = req.body.orderId;
    const orderProductDetail = await orderUserModel.findById(Id);
    
     if(!orderProductDetail){
        return res.status(400).json("did found the userOrderData")
      }

    res.status(200).json(orderProductDetail);
  }catch(error){
      res.status(500).json({msg:"error from orderUserDetaisl",message:error.message});
  }
}

