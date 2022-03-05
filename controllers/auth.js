const User = require("../models/User")
const bcrypt = require("bcrypt");
const {createAccessToken, 
      createRefreshToken,
      sendAccessToken,
      sendRefreshToken} = require('../middleware/tokens')

require('dotenv').config({path: './config/.env'})

exports.registerUser = async (req, res, next) => {
  
  const {email, password, userName, instagram, twitter, cashAppLink} = req.body
    
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
      instagram: instagram,
      twitter: twitter,
      cashAppLink: cashAppLink,
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
  } catch(err) {
    console.log(err)
  }
}

exports.loginUser = async (req, res, next) => {
    
  const {email, password} = req.body
  
  const user = await User.findOne({email: email})
  
  if(!user){ 
    res.json('email not found')
    return
  }

  const valid = bcrypt.compareSync(
    password,
    user.password
  );
  
  if(!valid){
    res.json({message:'Password Incorrect', password: password})
    return
  }

  try{
    const accesstoken = createAccessToken(user._id)

    const refreshtoken = createRefreshToken(user._id)

    await User.findOneAndUpdate({email: email},{refreshtoken: refreshtoken})
              
    res.json({
      userId: user._id,
      accesstoken: accesstoken, 
      refreshtoken: refreshtoken,
      userName: user.userName
    });
    
  } catch(err) {
    res.send({
      error: `${err.message}`,
    })
  }
};

exports.logoutUser = async (req, res) => {
  await User.findOneAndUpdate({_id: req.params.id}, {refreshtoken: ''})
  
  return res.json('Logged out')
}