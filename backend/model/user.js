// const bcrypt = require("bcrypt");
// const mongoose = require("mongoose")

// const userSchema = new mongoose.Schema({
//     Name:{
//         type:String,
//         required :true
//     },
//     Email:{
//         type:String,
//         required:true
//     },
//     Password:{
//         type:String,
//         required:true
//     },
//     Role:{
//         type:String,
//         // required:true
//     },
// });


// userSchema.pre('save', async function (next) {
//     if (!this.isModified("Password")) return next(); // Only hash if changed

//     const salt = await bcrypt.genSalt(10);
//     this.Password = await bcrypt.hash(this.Password, salt);
//     next();
// });

// const userModel = new mongoose.model("users",userSchema);
// module.exports = userModel;

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  Role: { type: String, default: "user" }
});

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // 👈 lowercase

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // 👈 lowercase
  next();
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;

