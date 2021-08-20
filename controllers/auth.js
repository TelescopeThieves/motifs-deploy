const passport = require("passport");
const validator = require("validator");
const config = require("../config/auth.config")
const cookieParser = require('cookie-parser')
const isAuth = require('../middleware/isAuth')
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs")
const { hash, compare } = require('bcryptjs')
const cloudinary = require("../middleware/cloudinary");
const {verify} = require('jsonwebtoken')
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

    // const hashedPassword = await hash(password, 10)

    // console.log(hashedPassword)

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
    
    sendRefreshToken(res, refreshtoken)
    
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

    console.log(req.body.password)
    
    const {email, password} = req.body
    
    const user = await User.findOne({email: email})
    
    const userId = user ? user._id : null
    
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
          
          sendRefreshToken(res, refreshtoken)
          
          res.json({
            userId: userId,
            accesstoken: accesstoken, 
            refreshtoken: refreshtoken
          });
      
      // res.json("Invalid Credentials"); 

    } catch(err){
      res.send({
        error: `${err.message}`,
      })
    }


};

exports.logoutUser = async (req, res) => {
  
  // console.log(req)

  // await User.findOne({userName: req.userName})
  res.clearCookie('refreshtoken', { path: '/refresh_token' });


  // Logic here for also remove refreshtoken from db
  // await User.findOneAndUpdate({_id: _req.user._id}, {refreshtoken: ''})

  // _req.logout();
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
      req.user = null;
  });

  return res.json('Logged out')
}


exports.protected = async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      res.send({
        data: 'This is protected data.',
      });
    }
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
}

exports.refresh_token = async (req, res) => {

  const token = req.cookies.refreshtoken;

  // If we don't have a token in our request
  if (!token) return res.send({ accesstoken: '' });

  // We have a token, let's verify it!
  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ accesstoken: '' });
  }
  // token is valid, check if user exist
  // const user = await User.findOne(user => user.id === payload.userId);
  const user = await User.findOne({_id: payload.userId})

  if (!user) return res.send({ accesstoken: '' });

  // user exist, check if refreshtoken exist on user
  if (user.refreshtoken !== token) return res.send({ accesstoken: '' });

  // token exist, create new Refresh- and accesstoken
  const accesstoken = createAccessToken(user._id);
  const refreshtoken = createRefreshToken(user._id);

  // update refreshtoken on user in db
  // Could have different versions instead!
  // user.refreshtoken = refreshtoken;
  await User.findOneAndUpdate({_id: user._id}, {
      refreshtoken: refreshtoken,
      accesstoken: accesstoken
  })

  // All good to go, send new refreshtoken and accesstoken
  sendAccessToken(req, res, accesstoken)
  sendRefreshToken(res, refreshtoken);

  res.status(200).json({
    accesstoken: accesstoken,
    refreshtoken: refreshtoken
  });
}