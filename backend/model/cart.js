// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({

//     userId:{
//         type:mongoose.Schema.Types.ObjectId
//     },
//     productId:{
//         type:mongoose.Schema.Types.ObjectId
//     }
// });

// const cartModel = new mongoose.model("cart",cartSchema);
// module.exports =  cartModel;


const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",       // reference the User collection
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",    // reference the Product collection
        required: true
    }
}, { timestamps: true });  // optional: adds createdAt and updatedAt

const cartModel = mongoose.model("Cart", cartSchema);
module.exports = cartModel;
