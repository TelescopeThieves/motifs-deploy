const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth')

router.post('/registerUser', authController.registerUser)

router.post('/login', authController.loginUser)

router.post('/logout/:id', authController.logoutUser)


module.exports = router;