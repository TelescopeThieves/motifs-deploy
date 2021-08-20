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
    // // upload audio to cloudinary
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
        cashAppLink: user.cashAppLink,
        audio: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
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

          // delete the post from user bookmarks
          const users = await User.find()
          await users.forEach( async (user) => {

            if(user.bookmarks.includes(postId)){

              
              await User.findByIdAndUpdate(
                  {_id: user._id},
                  {
                    $pull: {bookmarks: String(postId)}
                  }
                  )
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

    const bookmarkedBy = req.user
    const bookmarks = bookmarkedBy.bookmarks

    
    if(bookmarks.every(bookmark => `${bookmark}` !== `${req.params.id}`)){
        try {
            await Post.findOneAndUpdate({ _id: req.params.id },
              {
                $inc: { likes: 1 }
              })
          console.log('Post Bookmarked')    
          }catch (err) {
              console.log(err)
          }
    } else{
        try {
            await Post.findOneAndUpdate({ _id: req.params.id },
              {
                $inc: { likes: -1 }
              })
          console.log('Post unBookmarked')     
          }catch (err) {
              console.log(err)
          }
    }

    if(bookmarks.every(bookmark => `${bookmark}` !== `${req.params.id}`)){
        try {
            await User.findOneAndUpdate({_id: req.user._id},
                {
                $addToSet: { bookmarks: req.params.id },
                })   
          } 
          catch (err) {
            console.log(err)
          }
    }else{
        try {
            await User.findOneAndUpdate({_id: req.user._id},
                {
                $pull: { bookmarks: req.params.id }
                })
          } 
       catch (err) {
        console.log(err)
      }
    }
  },
  followArtist: async (req, res) => {

    const user = req.user
    const following = user.following

    if(following.every(follow => `${follow}` !== `${req.params.id}`)){
        try {
            await User.findOneAndUpdate({ _id: req.user._id },
              {
                $addToSet: { following: `${req.params.id}` }
              })
              console.log(`${user.userName} is now following ${req.params.id}`)
          }catch (err) {
              console.log(err)
          }
    } else{
        try {
            await User.findOneAndUpdate({ _id: req.user._id },
              {
                $pull: { following: `${req.params.id}` }
              })
              console.log(`${user.userName} is no longer following ${req.params.id}`)  
          }catch (err) {
              console.log(err)
          }
    }

    if(following.every(follow => `${follow}` !== `${req.params.id}`)){
        try {
            await User.findOneAndUpdate({_id: req.params.id},
                {
                $push: { followers: `${req.user._id}` },
                })   
          } 
          catch (err) {
            console.log(err)
          }
    }else{
        try {
            await User.findOneAndUpdate({_id: req.params.id},
                {
                $pull: { followers: `${req.user._id}`}
                })
          } 
       catch (err) {
        console.log(err)
      }
    }
  },
  deletePost: async (req, res) => {

    const post = await Post.find({_id: req.params.id})
    try {

      cloudinary.uploader.destroy(post[0].cloudinaryId, {resource_type: 'video'}, (err,res) => {
        console.log(res)
        console.log(err)
      })
      await Post.findOneAndDelete({ _id: req.params.id })
      console.log('Deleted Post')
    } catch (err) {
      console.log(err)
    }
  }
}    