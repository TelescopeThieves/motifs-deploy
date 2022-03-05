const { buildSchema } = require('graphql')
const Post = require('../models/Post')
const User = require('../models/User')

const getUser = async ( userId ) => {
  try {
    const user = await User.findById({_id: userId})
    return {
      ...user._doc, 
      createPosts: getPosts.bind(this, user._doc.createdPosts), 
      bookmarks: getPosts.bind(this, user._doc.bookmarks)
    }
  } catch (error) {
    console.log(error)
  }
}

const getUserGroup = async (userIds) => {
  try {
    const users = await User.find({_id: {$in: userIds}})
    return await Promise.all(users.map(user => {
      return {
        ...user._doc, 
        createdPosts: getPosts.bind(this, user._doc.createdPosts),
        bookmarks: getPosts.bind(this, user._doc.bookmarks)
      }
    }))  
  } catch (error) {
    console.log(error)
  }
}
const getSinglePost = async (id) => {
  try {
    const post = await Post.findById({_id: id})
    return {
      ...post._doc, 
      creator: getUser.bind(this, post._doc.creator),
      createdAt: new Date(post._doc.createdAt).toISOString()
    }
  } catch (error) {
    console.log(error)
  }
}

const getPosts = async ( postIds ) => {
  try {
    const posts = await Post.find({_id: {$in: postIds}})
    return await Promise.all(posts.map(post => {
      return {
        ...post._doc, 
        creator: getUser.bind(this, post._doc.creator),
        createdAt: new Date(post._doc.createdAt).toISOString()
      }
    }))
  } catch (error) {
    console.log(error)
  }
}

const API = {
  schema: buildSchema(`
    type Post {
      _id: ID!
      artist: String!
      title: String!
      audio: String!
      art: String!
      likes: Int!
      caption: String
      createdAt: String!
      cloudinaryId: String!
      mood: String!
      creator: User!
    }
    input PostInput {
      artist: String!
      title: String!
      audio: String!
      art: String
      likes: Int!
      caption: String
      createdAt: String!
      cloudinaryId: String!
      mood: String!
      creator: String!
    }
    type User {
      _id: ID!
      userName: String!
      email: String!
      password: String
      profilePicture: String,
      instagram: String,
      twitter: String,
      cashAppLink: String,
      avatar: String,
      refreshtoken: String,
      bookmarks: [Post!]
      createdPosts: [Post!]
      followers: [User!]
      following: [User!]
    }
    input UserInput {
      userName: String!
      email: String!
      password: String!
      profilePicture: String
      instagram: String
      twitter: String
      cashAppLink: String
      avatar: String
      refreshtoken: String!
    }
    type Message {
      response: String!
    }
    input BookmarkInput {
      trackId: String!
      userId: String!
    }
    input FollowInput{
      user: String!
      artist: String!
    }
    type RootQuery {
      post: [Post!]!
      user: [User!]!
    }
    type RootMutation {
      createPost(postInput: PostInput): Post 
      createUser(userInput: UserInput): User
      bookmark(bookmarkInput: BookmarkInput): Message
      removeBookmark(bookmarkInput: BookmarkInput): Message
      followArtist(followInput: FollowInput): Message
      unFollowArtist(followInput: FollowInput): Message
    }
    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    post: async () => {
      try {
        let posts = await Post.find()
          .sort({ createdAt: 'desc' })
          .lean()
        return await posts.map((post) => {
          return {
            ...post, 
            creator: getUser.bind(this, (String(post.creator))),
            createdAt: new Date(post.createdAt).toISOString()
          }
        })
      } catch (err) {
        console.log(err)
      } 
    },
    createPost: async (args) => {
      const {artist, title, caption, likes, creator, audio, cloudinaryId} = args.postInput
      try {                
        // upload audio to cloudinary
        // const result = await cloudinary.uploader.upload(req.file.path, {resource_type: 'video'},function(error, result) {
        //     if (error) {
        //         console.log(error)
        //     } else {
        //         console.log(`uploaded! : ${result}`);
        //     }
        // });
        // create post document in mongo
        const thisPost =  await Post.create({
          artist: artist,
          title: title,
          // audio: result.secure_url,
          // cloudinaryId: result.public_id,
          audio: audio,
          cloudinaryId: cloudinaryId,
          caption: caption || null,
          likes: likes,
          creator: creator,
          // art: req.body.art
        })
              
        // const cloudName = String(result.public_id)
        // const postId = thisPost._id
              
        User.findOneAndUpdate({_id: String(thisPost.creator)}, {$addToSet: {createdPosts: String(thisPost._id)}})
        // Delete audio/post from cloudinary/mongo after 24 hours
        // setTimeout(async () =>{
        // try {
        //    cloudinary.uploader.destroy(cloudName, {resource_type: 'video'}, (err,res) => {
  //             console.log(res)
  //             console.log(err)
  //         })
  //         // delete post from mongoDB
  //         Post.findOneAndDelete({ _id: String(postId)})
  
  //         // delete the post from all user bookmarks
  //         const users = await User.find()
  
  //         users.forEach( async (user) => {
    
    //             const bookmarks = user.bookmarks
    
    //             if(bookmarks[postId]){
      
      //             delete bookmarks.postId
      
      //             User.findByIdAndUpdate({_id: user._id},{ bookmarks: bookmarks})
      //             }
      //         })  
      
      //         } catch (err) {
        //             console.log(err)
        //         }
        //     }, 864000)  
        return thisPost
        // res.json({message: 'Upload successful!'})
      } catch (err) {
        console.log(err)
      } 
    },
    deletePost: async (args) => {
      const { trackId } = args.postInput
      const post = await Post.find({_id: trackId})
      try {
        cloudinary.uploader.destroy(post[0].cloudinaryId, {resource_type: 'video'}, (err,res) => {
          console.log(res)
          console.log(err)
        })
        await Post.findOneAndDelete({ _id: trackId })
        return {response: `${trackId} was deleted`}
      } catch (err) {
        console.log(err)
      }
    },
    user: async () => {
      try {
        let users = await User.find().lean()
        return await users.map((user) => {
          return {
            ...user, 
            createdPosts: getPosts.bind(this,(user.createdPosts)), 
            bookmarks: getPosts.bind(this,(user.bookmarks)),
          }
        })
      } catch (err) {
        console.log(err)
      }    
    },
    bookmark: async (args) => {
      const {trackId, userId} = args.bookmarkInput
      try {
        await Post.findOneAndUpdate({ _id: trackId }, { $inc: { likes: 1 }}, {new: true})
        const user = await User.findByIdAndUpdate({_id: userId}, {$addToSet: {bookmarks: trackId}}, {new: true})
        return {response: `${trackId} was bookmarked by ${userId}`}
      } catch (error) {
        console.log(error)
      }
    },
    removeBookmark: async (args) => {
      const {trackId, userId} = args.bookmarkInput
      try {
        await Post.findOneAndUpdate({ _id: trackId }, { $inc: { likes: -1 }}, {new: true})
        await User.findByIdAndUpdate({_id: userId}, {$pull: {bookmarks: trackId}}, {new: true})
        return {response: `${trackId} was removed from ${userId}'s bookmarks`}
      } catch (error) {
        console.log(error)
      }
    },
    followArtist: async (args) => {
      const {user, artist} = args.followInput
      try {
        await User.findByIdAndUpdate({_id: user}, {$addToSet: {following: artist}}, {new: true})
        await User.findByIdAndUpdate({_id: artist}, {$addToSet: {followers: user}}, {new: true})
        return {response: `${user} is now following ${artist}`}
      } catch (error) {
        console.log(error)
      }
    },
    unFollowArtist: async (args) => {
      const {user, artist} = args.followInput
      try {
        await User.findByIdAndUpdate({_id: user}, {$pull: {following: artist}})
        await User.findByIdAndUpdate({_id: artist}, {$pull: {followers: user}})
        return {response: `${user} is no longer following ${artist}`}
      } catch (error) {
        console.log(error)
      }
    }
  },
  graphiql: true
}

module.exports = API