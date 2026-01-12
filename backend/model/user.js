const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  
  email: {
     type: String,
     unique: true 
    },
  
    password: String,
  
  Role:{
     type: String, 
    default: "user" 
  },
  
  emailVerified :{
    type :Boolean,
    default : false
  } 

});

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); 

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); 
  next();
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;

