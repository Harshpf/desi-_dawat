// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//     Name:{
//         type:String, 
//         required:true
//     },
//     Price:{
//         type:Number,
//         required:true
//     },
//     Category:{
//         type:String,
//         required:true
//     },
//     image:[{
//         type:String,
//     }],
//     Description:{
//         type:String,
//         required:true
//     },
//     key:{
//         type:String,
//     }
// });

// const productModel = new mongoose.model("products",productSchema);

// module.exports = productModel;

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    Name: {
        type: String, 
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    image: [{
        type: String,
    }],
    Description: {
        type: String,
        required: true
    },
    key: {
        type: String,
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema); // ✅ capitalized

module.exports = Product; // ✅ make sure no invisible characters
