const User = require("../models/User");
const {uploadToS3} = require("../services/mediaServices");

const getProfile = async (req, res) => {
  
  try {
    const user = await User.findById(req.id)

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { email, role } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email required" }); // ✅ return
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, role },
      { returnDocument: "after" }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" }); // ✅ return
    }

    return res.status(200).json(user); // ✅ single response
  } catch (err) {
    return res.status(500).json({ error: err.message }); // ✅ no next()
  }
};

const uploadAvatar = async(req,res) => {
    try{
        const file = req.file
        if (!file) {
          return res.status(400).json({ message: "No file uploaded" }); // ✅ return
        }
        const url = await uploadToS3(file);
        const user = await User.findByIdAndUpdate(
             req.id,
            {avatarUrl:url},
            {returnDocument: "after"},
        );

       return res.json({avatarUrl: user.avatarUrl});
    }catch(err){
       return res.status(500).json({message: err.message})
    }

}

const deleteAvatar = async (req, res) => {
  try {
    
    await User.findByIdAndUpdate(
      req.id,
      { avatarUrl: "" },
      { returnDocument: "after" }
    );

   return res.json({ message: "Avatar removed" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {getProfile,updateProfile,uploadAvatar,deleteAvatar};