const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')

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

        res.json({jwtToken})

}

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

module.exports = {register,login,getUserById};