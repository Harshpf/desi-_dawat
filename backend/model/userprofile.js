const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
    
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String
  },
  phoneNumber: {
    type: Number
  }
}, { timestamps: true })

const userProfile = mongoose.model("userProfile",userProfileSchema);
module.exports = userProfile;