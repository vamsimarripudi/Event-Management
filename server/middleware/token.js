const jwt = require("jsonwebtoken")

const verifyToken = async (req,res,next) => {
   const header = req.headers["authorization"];

   if(!header){
    return res.status(401).json({message:"Token not provided"});

   }

   const token = header.split(" ")[1]

   try{
    const decoded =  jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req,user)
    next()
   }
   catch(err){
    return res.status(401).json({message:"Invalid Token"})
   }
}

module.exports = verifyToken