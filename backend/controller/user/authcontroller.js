const userModel = require("../../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

function sendTokenResponse(user, res){
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRETE_KEY, {expiresIn: "1h"});

    // res.cookie("token", token, {
    //     httpOnly: true,
    //     sameSite: "strict",
    //      path: "/", 
    //     maxAge: 60 * 60 * 1000
    // }).json({message: "login succesfull"});

      // set cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/", 
    maxAge: 60 * 60 * 1000,
  });

  // send user info in JSON
  res.status(200).json({
    msg: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.Role,
    },
  });

}


exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await userModel.findOne({ email }); 
    if (userExist) {
      return res.status(400).json({ msg: "already registered" });
    }

    const newUser = new userModel({
      name,
      email,
      password,
      Role: "user"
    });

    await newUser.save();

    return res.status(200).json({ msg: "Signup successful" });
  } catch (error) {
    return res.status(500).json({msg: "error in signup",message: error.message});
  }
};


// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body; 

//     const userExist = await userModel.findOne({ email });
//     if (!userExist) {
//       return res.status(400).json({ msg: "Register first" });
//     }


//     const matchPassword = await bcrypt.compare(password, userExist.password);
//     if (!matchPassword) {
//       return res.status(400).json({ msg: "the password is incorrect" });
//     }

//     return sendTokenResponse(userExist._id, res);
//   } catch (error) {
//     res.status(500).json({ msg: "error from login", message: error.message });
//   }
// };
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ msg: "Register first" });
    }

    const matchPassword = await bcrypt.compare(password, userExist.password);
    if (!matchPassword) {
      return res.status(400).json({ msg: "The password is incorrect" });
    }

    // send cookie + user info
    return sendTokenResponse(userExist, res);
  } catch (error) {
    res.status(500).json({ msg: "Error from login", message: error.message });
  }
};


exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict"
  });
  res.status(200).json({ msg: "Logout successful" });
};