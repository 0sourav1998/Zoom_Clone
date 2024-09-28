const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
require("dotenv").config();

exports.signup = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    if (!name || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      name,
      username,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
      createdUser
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Signing Up",
    });
  }
};

exports.login = async(req,res)=>{
  const {username,password} = req.body ;
  try {
    if(!username || !password){
      return res.status(400).json({
        success : false ,
        message : "All Fields Are Required"
      })
    }
    const user = await User.findOne({username});
    if(!user){
      return res.status(400).json({
        success : false ,
        message : "User is not registered"
      })
    }
    const payload = {
      _id : user._id
    };

    const token = jwt.sign(payload,process.env.JWT_SECRET,{
      expiresIn : "1d"
    });
    user.token = token ;

    const options = {
      expires : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) ,
      httpOnly : true 
    }

    return res.cookie("token",token,options).json({
      success : true ,
      message : "User Logged In" ,
      user ,
      token
    })
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Signing Up",
    });
  }
}