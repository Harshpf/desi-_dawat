
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",       
        required: true
    },
    cartProducts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",    
        required: true
    }]
   
}, { timestamps: true }); 

const cartModel = mongoose.model("Cart", cartSchema);
module.exports = cartModel;



