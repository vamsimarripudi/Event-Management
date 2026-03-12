const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

module.exports = {register,login};