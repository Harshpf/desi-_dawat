const mongoose = required("mongoose")

const orderUserDetailsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shippingAddress: {
      fullName: String,
      PhoneNumber:Number,
      address: String,
      city: String,
      state: String,
      district:String,
      postalCode: String,
      country: String,
    },
  },
  { timestamps: true }
);




const orderProductDetailsSchema = new mongoose.Schema(
    {
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



const orderProductModel = new mongoose.model("orderproduct",orderProductDetailsSchema);
const orderUserModel = new mongoose.model("orders",orderUserDetailsSchema);
module.exports = {orderModel,orderProductModel};