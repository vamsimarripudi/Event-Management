const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
const crypto = require("crypto");
const sendEmail = require("../mailer");
/*Register Api Controller*/
const register = async(req,res)=> {
    try{
        const {name,email,password} = req.body;

        const exists = await User.findOne({email});
        if(exists){
           return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword= await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({message: "Registered Successfully"});

    }catch(error){
        res.status(500).json({message:error.message})

    }
}
/*Login Api Controller*/
const login = async(req,res) => {
        const {email,password} = req.body

        const user = await User.findOne({email});
        if(!user){
          return  res.status(400).json({message: "Invalid Credentials"})
        }

        const isValid = await bcrypt.compare(password,user.password);

        if(!isValid){
            return res.status(400).json({message: "Invalid Credentials"})
        }

        console.log(user._id)

        const jwtToken = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"},
        )
        

        res.json({jwtToken})

}
/*Get users by id  Api Controller*/
const getUserById = async (req, res) => {
  const { id } = req.params; // use "id" not "_id" for route clarity

  // 1. Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    // 2. Query user
    const user = await User.findById(id).select("-password"); // exclude password

    // 3. Handle not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4. Success
    return res.status(200).json(user);

  } catch (error) {
    console.error("getUserById error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
/*ForgotPasword Api Controller*/
const forgotPassword = async (req,res) => {
  const {email} = req.body;

  const user = await User.findOne({email});

  if(!user){
    return res.status(404).json({message: "If Account exists, Email Sent."})
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 1000*60*15;
  await user.save()

  const resetUrl = `https://event.vamsimarripudi.tech/reset-password/${token}`

  await sendEmail({
    to: user.email,
    subject: "Reset Your Password",
    html: `
      <p>Hi ${user.name || "there"},</p>
      <p>You requested a password reset.</p>
      <p>
        <a href="${resetUrl}" style="padding:10px 15px;background:#111;color:#fff;text-decoration:none;">
          Reset Password
        </a>
      </p>
      <p>This link expires in 15 minutes.</p>
    `,
  });

  res.json({ message: "Reset link sent" });
}
/*Reset Password Api Controller*/
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
  const hashedUpdatedPassword= await bcrypt.hash(password,10)
  user.password = hashedUpdatedPassword; // make sure hashing middleware exists
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
};

module.exports = {register,login,getUserById,forgotPassword,resetPassword};