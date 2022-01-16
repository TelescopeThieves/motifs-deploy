const Post = require('../models/Post')
const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");
const fs = require('fs')


module.exports = {
    
  // getIndex: async (req, res) => {
  //     const hello = `Hello from the Motifs server!`
  //   try {
  //       res.json(hello)
  //       // res.redirect('/')
  //   } catch (err) {
  //       console.log(err)
  //   }
  // },
  getAll: async (req, res) => {
    try {
        // const user = await User.find({_id: req.user._id}) 
        const user = await User.find()
                .sort({ createdAt: 'desc' })
                .lean()
        const posts = await Post.find()
                .sort({ createdAt: 'desc' })
                .lean()
        res.json({posts, user})
        } catch (err) {
              console.log(err)
        }
  },
  getLoggedInUser: async (req, res) => {
    
    // let isLoggedIn = false
    
    const user = req.user

    if(user){
      try {
        let isLoggedIn = true
        res.json({user, isLoggedIn})
      } catch (err) {
        console.log(err)
      }
    } else{
      res.json({isLoggedIn: false, message: 'User Not Found'})
    }
  },
  getProfileOfArtist: async (req, res) => {
      try {
          const user = req.user
          const artist = await User.find({ _id: req.params.id })
          const posts = await Post.find({ user: req.params.id })
          res.json({ posts, user, artist})
          // await User.find({_id: req.user}) 
        } catch (err) {
      console.log(err)
    }
  },
  getFollowers: async (req, res) => {
      try {
          const user = req.user
          const followers = await Promise.all(user.followers.map(async (follower) => {
                const followedBy = await User.find({_id: follower})
                return followedBy[0]
          }))
          // res.render('followers', { followers: followers, user: user })
          res.json({ followers, user })          
        } catch (err) {
      console.log(err)
    }
  },
  getFollowing: async (req, res) => {
      try {
          const user = req.user
          const following = req.user.following
          const artistsUserFollows = []
          for(const artist in following){
              const artistInFollowing = await User.findById({_id: artist})
              artistsUserFollows.push(artistInFollowing)
          }
          res.json({ artistsUserFollows, user }) 
        } catch (err) {
          console.log(err)
        }
  },
  getSinglePost: async (req, res) => {
      try {
          const user = req.user

          const post = await Post.find({ _id: req.params.id })

          const artist = await User.find({ _id: post[0].user })
          // res.render('singlePost', { artist: artist, user: req.user, posts: post })
          res.json({artist, post, user})
        } catch (err) {
      console.log(err)
    }
  },
  getFeed: async (req, res) => {
    try {
    // const user = await User.find({_id: req.user._id}) 
    const user = req.user
    const posts = await Post.find()
          .sort({ createdAt: 'desc' })
          .lean()
          res.json({posts, user})
        } catch (err) {
          console.log(err)
        }
      },
  getFollowingFeed: async (req, res) => {
    try {
        const user = req.user
        const following = user.following
        const posts = []
        for(const artist in following){
          if(following[artist]){
            const postByArtistUserFollows = await Post.find({user: artist})
            posts.push(postByArtistUserFollows[0])
          }
        }
      res.json({posts, user})
    } catch (err) {
      console.log(err)
    }
  },
  getLibrary: async (req, res) => {
    try {
    //   let user = await User.find({_id: req.user.id})
    //   user = user[0]
        const user = req.user
        const posts = await Promise.all(user.bookmarks.map(async (bookmark) => {
                const bookmarkedPost = await Post.find({_id: bookmark})
                return bookmarkedPost[0]
            }))
    res.json({posts, user})
    } catch (err) {
      console.log(err)
    }
  },
}    