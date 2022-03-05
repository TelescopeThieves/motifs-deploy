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
    // const bookmarks = req.user.bookmarks
    // const trackId = req.params.id
    
    // if(bookmarks[trackId]){
    //   // unbookmark track
    //     delete bookmarks[trackId]
    //     await Post.findOneAndUpdate({ _id: trackId }, { $inc: { likes: -1 }})
    //   } else {
    //   // bookmark track
    //     bookmarks[trackId] = {bookmarked: true, bookmarkedOn: Date.now()}
    //     await Post.findOneAndUpdate({ _id: trackId }, { $inc: { likes: 1 }})
    // }
    // // update user's bookmark collection
    // try {
    //     await User.findByIdAndUpdate({_id: req.user._id}, {bookmarks: bookmarks})
    //     res.json({msg: bookmarks})
    // } catch (error) {
    //     console.log(error)
    // }
    // const trackId = req.params.id
    const userId = req.user._id
    const {id, toggle} = req.params
    if(toggle === 'bookmark'){
      try {
        await Post.findOneAndUpdate({ _id: id }, {$inc: { bookmarkCount: 1 }})
        await User.findOneAndUpdate({_id: userId}, {$addToSet: { bookmarks: id }})
        res.json({msg: `${id} has been bookmarked`})
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        await Post.findOneAndUpdate({ _id: id }, {$inc: { bookmarkCount: -1 }})
        await User.findOneAndUpdate({_id: userId}, {$pullAll: { bookmarks: [id] }})
        res.json({msg: `${id} has been unBookmarked`})
      } catch (error) {
        console.log(error)
      }
    }
  },
  followArtist: async (req, res) => {

    const user = req.user
    const following = user.following
    const artistId = req.params.id
    const artist = await User.findOne({_id: artistId})
    const artistFollowers = artist.followers

    if(following[artistId]){
      // unfollow the artist
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
        const date = Date.now()
        // follow the artist
        following[artistId] = {following: true, followDate: date}
        artistFollowers[user._id] = {followedBy: true, followedDate: date}
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