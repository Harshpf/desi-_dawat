
exports.verifymailToken = (req,res,next) => {
    try{
        const verifyToken = req.params.verifyToken;
        
        if(!verifyToken){
            return res.status(401).json({msg:"No token provided"});
        }
        const decodeVerifyToken = jwt.verify(verifyToken,process.env.EMAIL_VERIFICATION_SECRET);
        next();
    }catch(err){
        res.status(500).json({msg:"error from verifymailToken middlware",message:err.message});
    }
}