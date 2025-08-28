const jwt = require("jsonwebtoken");

exports.validateUser = async(req,res,next) => {

    try{
        const token = req.cookies.token;
        console.log(token);

    // const tokenValue = req.cookies && req.cookies.token;
    if (!token) {
        return res.status(401).json({ msg: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY);
    req.userId = decoded.id;
    next();
    
}catch(err){
    res.status(500).json({msg:"error validating token",message:err.message})
}
}