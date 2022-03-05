const Post = require('../models/Post')
const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");
const fs = require('fs')


module.exports = {
    
  getAll: async (req, res) => {
    try {
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
  getUserObj: async (req, res) => {
    try {
        const user = await User.find({_id: req.params.id})
        res.json({user})
        } catch (err) {
              console.log(err)
        }
  },
  getLoggedInUser: async (req, res) => {
        
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
        } catch (err) {
      console.log(err)
    }
  },
  getFollowers: async (req, res) => {
    const targetUser = await User.findById({_id: req.params.id})
    const followers = targetUser.followers
    const followersOfUser = []
    try {
      for(const follower in followers){
        const eachFollower = await User.findById({_id: follower})
        followersOfUser.push(eachFollower)
      }
      res.json({followersOfUser})
    } catch (error) {
      console.log(error)
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
          res.json({artist, post, user})
        } catch (err) {
      console.log(err)
    }
  },
  getFeed: async (req, res) => {
    const user = req.user  
    try {
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
      const user = await User.findById({_id: req.user._id}).populate({path:'bookmarks', options: { sort: { createdAt: -1 } }})
      // for(const bookmark in bookmarks){
      //   if(bookmarks[bookmark]){
      //     const bookmarkedPost = await Post.find({_id: bookmark})
      //     posts.push(bookmarkedPost[0]) 
      //   }
      // }
      console.log("backend:", user)
      res.json({posts: user.bookmarks, user})
    } catch (err) {
      console.log(err)
    }
  },
}    