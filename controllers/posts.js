const Post = require("../models/Post");
const User = require("../models/User");
const DeadPost = require("../models/DeadPost");
const cloudinary = require("../middleware/cloudinary");

module.exports = {
  
  createPost: async (req, res) => {
    try {
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
        audio: result.secure_url,
        cloudinaryId: result.public_id,
        art: req.body.art || null,
        caption: req.body.caption || null,
        bookmarkCount: 0,
        playCount: 0,
        ephemeral: true,  // hard coded for now
        mood: 'blue', // hard coded for now
        creator: req.user._id
      })
    const cloudName = String(result.public_id)
    const postId = thisPost._id
    
    // Delete audio/post from cloudinary/mongo and create DeadPost Headstone after 24 hours (86400000 milliseconds)
    if(thisPost.ephemeral){

      setTimeout(async () => {
        // create headstone
        DeadPost.create({
          artist: thisPost.artist,
          title: thisPost.title,
          caption: thisPost.caption || null,
          art: thisPost.art || null,
          bookmarkCount: thisPost.bookmarkCount,
          playCount: thisPost.bookmarkCount,
          creator: thisPost.creator
        })
        // delete from cloudinary
        try {
          cloudinary.uploader.destroy(cloudName, {resource_type: 'video'}, (err,res) => {
            console.log(res)
            console.log(err)
          })
          // delete post from mongoDB
          await Post.findOneAndDelete({ _id: String(postId)})
              
          // delete the post from all user bookmarks
          const users = await User.find({bookmarks: {$in: [postId]}})
          users.forEach(async (user) => {
            await User.findOneAndUpdate({_id: user._id}, {$pullAll:  { bookmarks: [postId] } });
          });

        } catch (err) {
          console.log(err)
        }
      }, 30000)  
    }

    res.json({message: 'Upload successful!'})

    } catch (err) {
      console.log(err)
    } 
  },
  // addArt: async (req, res) => {

  // },
  bookmarkPost: async (req, res) => {
    const userId = req.user._id
    const {postId, toggle} = req.params
    if(toggle === 'bookmark'){
      try {
        await Post.findOneAndUpdate({ _id: postId }, {$inc: { bookmarkCount: 1 }})
        await User.findOneAndUpdate({_id: userId}, {$addToSet: { bookmarks: postId }})
        res.json({msg: `${postId} has been bookmarked`});
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        await Post.findOneAndUpdate({ _id: postId }, {$inc: { bookmarkCount: -1 }})
        await User.findOneAndUpdate({_id: userId}, {$pullAll: { bookmarks: [postId] }})
        res.json({msg: `${postId} has been unBookmarked`});
      } catch (error) {
        console.log(error)
      }
    }
  },
  followArtist: async (req, res) => {
    const {artistId, toggle} = req.params;
    const userId = req.user._id;
    
    if(toggle === 'follow'){
      try {
        await User.findOneAndUpdate({_id: userId}, {$addToSet: { following: artistId }});
        await User.findOneAndUpdate({_id: artistId}, {$addToSet: { followers: userId }});
        res.json({msg: `${artistId} is being followed by ${userId}`});
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await User.findOneAndUpdate({_id: userId}, {$pullAll: { following: [artistId] }});
        await User.findOneAndUpdate({_id: artistId}, {$pullAll: { followers: [userId] }});
        res.json({msg: `${artistId} has been unfollowed by ${userId}`});
      } catch (error) {
        console.log(error); 
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