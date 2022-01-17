const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth')
const { ensureAuth } = require("../middleware/auth");
// const multer = require("multer");
// const upload = multer({ dest: "public/uploads/" });
// const { storage } = require("../middleware/multer");

//Post Routes - simplified for now

// router.post('/protected', authController.protected)
// router.post('/refresh_token', authController.refresh_token)

router.post('/registerUser', authController.registerUser)

router.post('/login', authController.loginUser)

router.post('/logout/:id', authController.logoutUser)


module.exports = router;