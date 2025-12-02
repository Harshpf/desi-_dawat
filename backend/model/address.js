// const mongoose = require("mongoose");


// const addressSchema = new mongoose.Schema({

//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         required: true
//     },
//     userName:{
//         type:String,
//         required:true
//     },
//     pinCode:{
//         type:Number,
//         reqiured:true
//     },
//     phoneNumber:{
//         type:Number,
//         required:true
//     },
//     state:{
//         type:String, 
//         required:true
//     },
//     district:{
//         type:String, 
//         required:true
//     },
//     city:{
//         type:String, 
//         required:true
//     },
//     landMark:{
//         type:String,
//         required:true
//     } 
// });


// const addressModel = new mongoose.model("address",addressSchema);
// module.exports = addressModel;


const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },

  fullName: {
    type: String,
    required: true
  },

  phone: {
    type: Number,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  addressLine1: {
    type: String,
    required: true
  },

  addressLine2: {
    type: String
  },

  city: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  },

  pincode: {
    type: Number,
    required: true
  },

  landmark: {
    type: String
  },

  addressType: {
    type: String,
    enum: ["Home", "Work", "Other"],
    default: "Home",
    required: true
  },

  saveAddress: {
    type: Boolean,
    default: false
  },

}, { timestamps: true });

module.exports = mongoose.model("address", addressSchema);
