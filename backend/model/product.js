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
    Tag:{
        type:String,
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product; 
