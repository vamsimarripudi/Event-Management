const User = require("../models/User");

const getUserProfile = async(req,res)=>{
    try{
        console.log("User details", req,user)
        const userId = req.user._id || req.user.id
        const user = await User.findById(req.user._id).select("-password");
        if(!user){
            res.status(404).json({message: "User Not Found"})
        }
       return res.json(user)
    }
    catch(err){
        res.json(err.message);
    }
}

module.exports = {getUserProfile};