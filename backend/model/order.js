const mongoose = require("mongoose")

const orderUserDetailsSchema = new mongoose.Schema(
  {
    _id:{
      type:String,
      rquired:true

    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    shippingAddress: {
      fullName: String,
      PhoneNumber:Number,
      address: String,
      city: String,
      state: String,
      district:String,
      pinCode: String,
      country: String,
    },
  },
  { timestamps: true }
);




const orderProductDetailsSchema = new mongoose.Schema(
    {
      _id:{
      type:String,
      rquired:true

    },
   items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String, 
        price: Number, 
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },
    
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);



const orderProductModel = new mongoose.model("orderedproducts",orderProductDetailsSchema);
const orderUserModel = new mongoose.model("ordereduser",orderUserDetailsSchema);
module.exports = {orderUserModel,orderProductModel};