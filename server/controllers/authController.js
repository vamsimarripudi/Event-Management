const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
const crypto = require("crypto");
const {sendEmail} = require("../mailer");
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

        const jwtToken = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"},
        )
        const role = user.role;
        res.json({jwtToken,role})

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
        <div style="font-family: Arial, sans-serif; background:#f5f7fa; padding:20px;">
          
          <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px; overflow:hidden;">
            
            <!-- Header -->
            <div style="background:#111; color:#fff; padding:16px 20px;">
              <h2 style="margin:0;">Reset Your Password</h2>
            </div>

            <!-- Body -->
            <div style="padding:20px;">
              
              <p>Hi ${user.name || "there"},</p>

              <p>
                We received a request to reset your password.  
                Click the button below to set a new password.
              </p>

              <!-- CTA -->
              <div style="text-align:center; margin:25px 0;">
                <a href="${resetUrl}" 
                  style="background:#111; color:#fff; padding:12px 18px; text-decoration:none; border-radius:6px; display:inline-block;">
                  Reset Password
                </a>
              </div>

              <p style="color:#555;">
                This link will expire in <b>15 minutes</b>.  
                If you did not request this, you can safely ignore this email.
              </p>

            </div>

            <!-- Footer -->
            <div style="background:#f1f1f1; padding:15px; text-align:center; font-size:12px; color:#555;">
              Event Management Platform
            </div>

          </div>

        </div>
        `
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

  sendEmail({
    to: user.email,
    subject:"Reset Password",
    html: `
      <div style="font-family: Arial, sans-serif; background:#f5f7fa; padding:20px;">
        
        <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px; overflow:hidden;">
          
          <!-- Header -->
          <div style="background:#111; color:#fff; padding:16px 20px;">
            <h2 style="margin:0;">Password Updated Successfully</h2>
          </div>

          <!-- Body -->
          <div style="padding:20px;">
            
            <p>Hi ${user.name || "there"},</p>

            <p>
              Your password has been successfully updated.
            </p>

            <p style="color:#555;">
              If you made this change, no further action is required.
            </p>

            <p style="color:#d9534f;">
              If you did NOT perform this action, please reset your password immediately or contact support.
            </p>

            <!-- CTA -->
            <div style="text-align:center; margin:25px 0;">
              <a href="https://event.vamsimarripudi.tech/login"
                style="background:#111; color:#fff; padding:12px 18px; text-decoration:none; border-radius:6px;">
                Go to Login
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div style="background:#f1f1f1; padding:15px; text-align:center; font-size:12px; color:#555;">
            Event Management Platform
          </div>

        </div>

      </div>
      `
  })

  res.json({ message: "Password reset successful" });
};

module.exports = {register,login,getUserById,forgotPassword,resetPassword};