const User = require("../models/User");

const getUserProfile = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id).select("-password");
        if(!user){
            res.status(404).json({message: "User Not Found"})
        }
        res.json(user)
    }
    catch(err){
        res.json(err.message);
    }
}

module.exports = {getUserProfile};