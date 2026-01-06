// const mongoose = require("mongoose")

// const orderUserDetailsSchema = new mongoose.Schema(
//   {
//     _id:{
//       type:String,
//       rquired:true

//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },

//     shippingAddress: {
//       fullName: String,
//       PhoneNumber:Number,
//       address: String,
//       city: String,
//       state: String,
//       district:String,
//       pinCode: String,
//       country: String,
//     },
//   },
//   { timestamps: true }
// );




// const orderProductDetailsSchema = new mongoose.Schema(
//     {
//       _id:{
//       type:String,
//       rquired:true

//     },
//    items: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         name: String, 
//         price: Number, 
//         quantity: {
//           type: Number,
//           required: true,
//           min: 1,
//         },
//       },
//     ],

//     totalAmount: {
//       type: Number,
//       required: true,
//     },
    
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "paid", "failed"],
//       default: "pending",
//     },

//     orderStatus: {
//       type: String,
//       enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );



// const orderProductModel = new mongoose.model("orderedproducts",orderProductDetailsSchema);
// const orderUserModel = new mongoose.model("ordereduser",orderUserDetailsSchema);
// module.exports = {orderUserModel,orderProductModel};


// const mongoose = require("mongoose");

// // User order (shipping address)
// const orderUserDetailsSchema = new mongoose.Schema(
//   {
//     _id: {
//       type: String,
//       required: true,
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "users",
//       required: true,
//     },
//     shippingAddress: {
//       fullName: { type: String, required: true },
//       phone: { type: Number, required: true },
//       email: { type: String, required: true },
//       addressLine1: { type: String, required: true },
//       addressLine2: { type: String },
//       city: { type: String, required: true },
//       state: { type: String, required: true },
//       pincode: { type: Number, required: true },
//       landmark: { type: String },
//       addressType: { type: String, enum: ["Home", "Work", "Other"], default: "Home" },
//     },
//   },
//   { timestamps: true }
// );

// // Order products
// const orderProductDetailsSchema = new mongoose.Schema(
//   {
//     _id: {
//       type: String,
//       required: true,
//     },
//     items: [
//       {
//         product: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
//         name: { type: String, required: true },
//         price: { type: Number, required: true },
//         quantity: { type: Number, required: true, min: 1 },
//       },
//     ],
//     totalAmount: { type: Number, required: true },
//     paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
//     orderStatus: {
//       type: String,
//       enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// const orderUserModel = mongoose.model("ordereduser", orderUserDetailsSchema);
// const orderProductModel = mongoose.model("orderedproducts", orderProductDetailsSchema);

// module.exports = { orderUserModel, orderProductModel };


const mongoose = require("mongoose");

// User order (shipping address)
const orderUserDetailsSchema = new mongoose.Schema(
  {
    _id: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    shippingAddress: {
      fullName: String,
      phone: Number,
      email: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      pincode: Number,
      landmark: String,
      addressType: {
        type: String,
        enum: ["Home", "Work", "Other"],
        default: "Home",
      },
    },
  },
  { timestamps: true }
);

// Order products
const orderProductDetailsSchema = new mongoose.Schema(
  {
    _id: String,
    items: [
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String },     // ⭐ ADD THIS
  }
],

    totalAmount: Number,
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

const orderUserModel = mongoose.model("ordereduser", orderUserDetailsSchema);
const orderProductModel = mongoose.model("orderedproducts", orderProductDetailsSchema);

module.exports = { orderUserModel, orderProductModel };

//commit check 