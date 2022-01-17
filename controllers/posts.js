const Post = require('../models/Post')
const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");
const fs = require('fs')


module.exports = {

  addAccessToken: async (req, res) => {
   await User.findOneAndUpdate({_id: req.user._id}, {accesstoken: req.accesstoken})
  },
  
  createPost: async (req, res) => {
    try {
    const user = req.user
    // upload audio to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {resource_type: 'video'},function(error, result) {
      if (error) {
			      console.log(error)
		  } else {
			      console.log(`uploaded!`);
		  }
	  });
    // create post document in mongo
    const thisPost =  await Post.create({
        artist: req.body.artist,
        title: req.body.title,
        cashAppLink: user.cashAppLink || null,
        instagram: user.instagram || null,
        twitter: user.twitter || null,
        audio: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption || null,
        likes: 0,
        user: req.user._id,
        art: req.body.art
      })
    const cloudName = String(result.public_id)
    const postId = thisPost._id
    // Delete audio/post from cloudinary/mongo after 24 hours
    setTimeout(async () =>{
      try {
          cloudinary.uploader.destroy(cloudName, {resource_type: 'video'}, (err,res) => {
            console.log(res)
            console.log(err)
          })
          // delete post from mongoDB
          await Post.findOneAndDelete({ _id: String(postId)})
          
          // delete the post from all user bookmarks
          const users = await User.find()
          await users.forEach( async (user) => {
            
            const bookmarks = user.bookmarks
            
            if(bookmarks[postId]){

              delete bookmarks.postId
              
              await User.findByIdAndUpdate({_id: user._id},{ bookmarks: bookmarks})
            }
          })  

          } catch (err) {
          console.log(err)
        }
    }, 864000)  

        res.json({message: 'Upload successful!'})
    }   catch (err) {
        console.log(err)
    } 
  },
  addArt: async (req, res) => {

  },
  likePost: async (req, res) => {
    const bookmarks = req.user.bookmarks
    const trackId = req.params.id
    
    if(bookmarks[trackId]){
        bookmarks[trackId] = false
        await Post.findOneAndUpdate({ _id: trackId }, { $inc: { likes: -1 }})
      } else {
        bookmarks[trackId] = true
        await Post.findOneAndUpdate({ _id: trackId }, { $inc: { likes: 1 }})
    }
    try {
        await User.findByIdAndUpdate({_id: req.user._id}, {bookmarks: bookmarks})
        res.json({msg: "bookmark updated"})
    } catch (error) {
        console.log(error)
    }
  },
  followArtist: async (req, res) => {

    const user = req.user
    const following = user.following
    const artistId = req.params.id
    const artist = await User.findOne({_id: artistId})
    const artistFollowers = artist.followers

    if(following[artistId]){
      delete following[artistId]
      delete artistFollowers[user._id]
      try {
          // remove the artist from the list of artists the user followers
          await User.findOneAndUpdate({_id: user._id}, {following: following})
          // remove the user from the list of users that follow the artist
          await User.findByIdAndUpdate({_id: artistId}, {followers: artistFollowers})
          res.json({msg: `${user.userName} is no longer following ${artist.userName}`})
        } catch (error) {
          console.log(error)
        }
      } else {
        following[artistId] = true
        artistFollowers[user._id] = true
        try {
          // add artist to the list of artists the user follows
          await User.findOneAndUpdate({_id: user._id}, {following: following})
          // add user to the list of users who follow the artist 
          await User.findByIdAndUpdate({_id: artistId}, {followers: artistFollowers})
          res.json({msg: `${user.userName} is now following ${artist.userName}`})
        } catch (error) {
          console.log(error)
        }
    }
  },
  deletePost: async (req, res) => {
    const track_id = req.params.id
    const post = await Post.find({_id: track_id})
    try {
      cloudinary.uploader.destroy(post[0].cloudinaryId, {resource_type: 'video'}, (err,res) => {
        console.log(res)
        console.log(err)
      })
      await Post.findOneAndDelete({ _id: track_id })
      console.log('Deleted Post')
    } catch (err) {
      console.log(err)
    }
  }
}    