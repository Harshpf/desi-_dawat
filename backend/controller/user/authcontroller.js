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



exports.signup = async (req,res) =>{

    try{
        const userdata = req.body;
        
        const userExist = await userModel.findOne({ Email: userdata.Email });
        if(userExist){
            res.status(400).json({msg:"already registered"})
        }

        const newUser = new userModel({
            Name: userdata.Name,
            Email: userdata.Email,
            Password: userdata.Password,
            Role: "user"
        }) 
        
        await newUser.save();
        res.status(200).json("succesfully add new user");
    }catch(error){
        res.status(500).json({msg:"error in singup",message:error.message});
    }
}


exports.login = async(req,res) =>{
    try{
        const userdata = req.body;
        const userExist  = await userModel.findOne({Email:userdata.Email});

        if(!userExist){
            res.status(201).json({msg:"Register first"});
        }

        const matchPassword = await bcrypt.compare(userdata.Password,userExist.Password);
        if(!matchPassword){
            res.status(400).json({msg:"the password is incorrect"})
        }
        
        sendTokenResponse(userExist._id, res);
    }catch(error){
        res.status(500).json({msg:"error from login", message:error.message})
    }
}