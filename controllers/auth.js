// const passport = require("passport");
// const validator = require("validator");
// const config = require("../config/auth.config")
// const cookieParser = require('cookie-parser')
// const jwt = require("jsonwebtoken")
// const bcryptjs = require("bcryptjs")
// const { hash, compare } = require('bcryptjs')
// const cloudinary = require("../middleware/cloudinary");
// const isAuth = require('../middleware/isAuth')
// const {verify} = require('jsonwebtoken')
const User = require("../models/User")
const bcrypt = require("bcrypt");
const {createAccessToken, 
      createRefreshToken,
      sendAccessToken,
      sendRefreshToken} = require('../middleware/tokens')

require('dotenv').config({path: './config/.env'})

exports.registerUser = async (req, res, next) => {
  
  const {email, password, userName} = req.body
    
  try{
    const emailCheck = await User.findOne({email: email})
    const nameCheck = await User.findOne({userName: userName})
    
    if(emailCheck || nameCheck){
        throw new Error('Email or username already registered')
    }

    const user = await User.create({
      userName: req.body.userName,
      email: email,
      password: password,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      cashAppLink: req.body.cashAppLink,
      profilePicture: req.body.profilePicture
    });

    const accesstoken = createAccessToken(user._id)

    const refreshtoken = createRefreshToken(user._id)

    await User.findOneAndUpdate({email: email},{refreshtoken: refreshtoken})
    
    // sendRefreshToken(res, refreshtoken)
    
    res.json({
      userId: user._id,
      accesstoken: accesstoken, 
      refreshtoken: refreshtoken
    });
    }
    catch(err){
      console.log(err)
    }
}

exports.loginUser = async (req, res, next) => {
    
    const {email, password} = req.body
    
    const user = await User.findOne({email: email})
    
    const userId = user ? user._id : null

    const bookmarks = user ? user.bookmarks : null

    const following = user ? user.following : null

    const followers = user ? user. followers : null

    const userName = user ? user.userName : null
    
    if(!user){ 
      res.json('email not found')
      return
    }

    const valid = bcrypt.compareSync(
      password,
      user.password
    );
   
    if(!valid) {
      res.json({message:'Password Incorrect', password: password})
      return
    }

    try{

          const accesstoken = createAccessToken(user._id)

          const refreshtoken = createRefreshToken(user._id)
  
          await User.findOneAndUpdate({email: email},{refreshtoken: refreshtoken})
                    
          res.json({
            userId: userId,
            accesstoken: accesstoken, 
            refreshtoken: refreshtoken,
            userName: userName
          });
      
    } catch(err){
      res.send({
        error: `${err.message}`,
      })
    }
};

exports.logoutUser = async (req, res) => {
  await User.findOneAndUpdate({_id: req.params.id}, {refreshtoken: ''})
  
  return res.json('Logged out')
}