const userModel = require("../../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

function sendTokenResponse(userid, res){
    const token = jwt.sign({id: userid}, process.env.JWT_SECRETE_KEY, {expiresIn: "1h"});

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000
    }).json({message: "login succesfull"});

}


exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body; // 👈 match frontend keys

    // Check if user already exists
    const userExist = await userModel.findOne({ email }); // 👈 lowercase
    if (userExist) {
      return res.status(400).json({ msg: "already registered" });
    }

    // Hash password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password,
      Role: "user"
    });

    await newUser.save();

    return res.status(200).json({ msg: "Signup successful" });
  } catch (error) {
    return res.status(500).json({
      msg: "error in signup",
      message: error.message
    });
  }
};




exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // 👈 destructure cleanly

    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ msg: "Register first" });
    }

    // 👇 fix typo here
    const matchPassword = await bcrypt.compare(password, userExist.password);
    if (!matchPassword) {
      return res.status(400).json({ msg: "the password is incorrect" });
    }

    return sendTokenResponse(userExist._id, res);
  } catch (error) {
    res.status(500).json({ msg: "error from login", message: error.message });
  }
};
