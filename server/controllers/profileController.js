const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/RegistrationModel")
const {uploadToS3} = require("../services/mediaServices");

const getProfile = async (req, res) => {
  
  try {
    const user = await User.findById(req.user.id)

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
      req.user.id,
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
             req.user.id,
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
      req.user.id,
      { avatarUrl: "" },
      { returnDocument: "after" }
    );

   return res.json({ message: "Avatar removed" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getProfileAnalysis = async(req,res)=>{
  try{
    const userId = req.user.id 

    const user = await User.findById(userId)

    const joinedEvents = await Registration.countDocuments({
      user: userId,
    })

    const feedbackCount = await Feedback.countDocuments({
      user: userId
    })


    let strength = 0;

    if(user.avatarUrl) strength+=25;
    if(user.bio) strength +=20
    if(user.role) strength += 20
    if(user.email) strength +=15
    if(joinedEvents > 0) strength +=10
    if(feedbackCount > 0)  strength +=10

    let engagementLevel = "Begineer";
    if(joinedEvents>=3){
      engagementLevel = "Active";
    }
    if(joinedEvents >= 10){
      engagementLevel = "Contributor"
    }
    if(joinedEvents>20){
      engagementLevel = "Power User";
    }

    let summary = "New user exploring the platform."

    if(joinedEvents>5 && feedbackCount > 5){
      summary = "Highly engaged user actively participating in events and contributing valuable feedback."

    }

    if(user.role === "organizer"){
      summary = "Organizer focused on building engaging event experiences and community interaction."

    }

    res.json({
      profileStrength: strength,
      engagementLevel,
      joinedEvents,
      feedbackCount,
      summary,
    })

  }catch(error){
    console.log(error);
    res.status(500).json({message: "Failed to analyze profile"})
  }


}

module.exports = {getProfile,updateProfile,uploadAvatar,deleteAvatar, getProfileAnalysis};