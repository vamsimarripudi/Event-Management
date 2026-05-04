const User = require("../models/User");
const {uploadToS3} = require("../services/mediaServices");

const getProfile = async (req, res) => {
  
  try {
    const {userId} = req.body;
    const user = await User.findById(userId).select(
      "name email role avatarUrl"
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfile = async(req,res) => {
  
    try{
        const{email,role,userId} = req.body


        if(!email||!role){
            res.status(404).json({message: "Required all fields"})
        }

        const user = await User.findByIdAndUpdate(
             userId,
            {email,role},
            {returnDocument:"after"},
        );

        return res.json(user)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const uploadAvatar = async(req,res) => {
    try{
        const file = req.file
        const {userId} = req.body;
        const url = await uploadToS3(file);
        const user = await User.findByIdAndUpdate(
          userId,
            {avatarUrl:url},
            {returnDocument: "after"},
        );

        res.json({avatarUrl: user.avatarUrl});
    }catch(err){
        res.status(500).json({message: err.message})
    }

}

const deleteAvatar = async (req, res) => {
  try {
    const userId = req.body;
    await User.findByIdAndUpdate(
      userId,
      { avatarUrl: "" },
      { returnDocument: "after" }
    );

    res.json({ message: "Avatar removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {getProfile,updateProfile,uploadAvatar,deleteAvatar};