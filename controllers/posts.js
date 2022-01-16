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
    
    const user = req.user._id

    const bookmarks = req.user.bookmarks

    const track_id = req.params.id
    
    if(!bookmarks.includes(`${track_id}`)){
        try {
          
          await Post.findOneAndUpdate({ _id: track_id },
            {
              $inc: { likes: 1 }
            })
            
          await User.findOneAndUpdate({_id: user},
            {
              $addToSet: { bookmarks: track_id },
            }) 

          res.json({message:'Post Bookmarked'})

        } catch (err) {

          console.log(err)

        }
    } else {
      try {
        
        await Post.findOneAndUpdate({ _id: track_id },
          {
            $inc: { likes: -1 }
          })
        
        await User.findOneAndUpdate({_id: user},
          {
            $pull: { bookmarks: track_id }
          })
        
        res.json({message:'Post unBookmarked'})

      }catch (err) {

        console.log(err)

      }
    }
  },
  followArtist: async (req, res) => {

    const userIsFollowing = req.user.following

    const artist = req.params.id

    const user = req.user._id

    if(!userIsFollowing.includes(`${artist}`)){
      try {
          
        await User.findOneAndUpdate({ _id: user },
          {
            $addToSet: { following: `${artist}` }
          })
          
        await User.findOneAndUpdate({_id: artist},
          {
            $push: { followers: `${user}` },
          }) 
      
        res.json(`${req.user.userName} is now following ${artist}`)

        } catch (err) {
        
          console.log(err)

      }
    } else {
      try {
        
        await User.findOneAndUpdate({ _id: user },
          {
            $pull: { following: `${artist}` }
          })
        
        await User.findOneAndUpdate({_id: artist},
          {
            $pull: { followers: `${user}`}
          })
        
        res.json(`${req.user.userName} is no longer following ${artist}`) 

        } catch (err) {

            console.log(err)
      
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