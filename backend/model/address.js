const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        // required: true
    },
    userName:{
        type:String,
        required:true
    },
    pinCode:{
        type:Number,
        reqiured:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    state:{
        type:String, 
        required:true
    },
    district:{
        type:String, 
        required:true
    },
    city:{
        type:String, 
        required:true
    },
    landMark:{
        type:String,
        required:true
    } 
});


const addressModel = new mongoose.model("address",addressSchema);
module.exports = addressModel;