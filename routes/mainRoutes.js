// const { ensureAuth, ensureGuest } = require('../middleware/auth')
const express = require('express')
const router = express.Router()
const getController = require('../controllers/get')
const authJwt = require("../middleware/authJwt");



router.get('/all', getController.getAll)
router.get('/userObj/:id', getController.getUserObj)
router.get('/feed', authJwt, getController.getFeed)
router.get('/followingFeed', authJwt, getController.getFollowingFeed)
router.get('/followers/:id', authJwt, getController.getFollowers)
router.get('/following/:id', authJwt, getController.getFollowing)
router.get('/library', authJwt, getController.getLibrary)
router.get('/loggedInUser', getController.getLoggedInUser)
router.get('/getProfileOfArtist/:id', authJwt, getController.getProfileOfArtist)
router.get('/getSinglePost/:id', authJwt, getController.getSinglePost)

module.exports = router