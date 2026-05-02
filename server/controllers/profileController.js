const User = require("../models/User");

const getUserProfile = async(req,res)=>{
    const {id} = req.body
    try{
        
        const user = await User.findById(id).select("-password");
        if(!user){
          return  res.status(404).json({message: "User Not Found"})
        }
       return res.json(user)
    }
    catch(err){
        res.json(err.message);
    }
}

module.exports = {getUserProfile};