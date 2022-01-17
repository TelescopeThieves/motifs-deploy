const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const { ensureAuth } = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });
const { storage } = require("../middleware/multer");
const authJwt = require("../middleware/authJwt");


//Post Routes - simplified for now

router.post("/createPost", authJwt, upload.single("file"), postsController.createPost);

router.put("/addArt/:id", upload.single("file"), postsController.addArt);

router.put("/likePost/:id", authJwt, postsController.likePost);

router.put("/followArtist/:id", authJwt, postsController.followArtist);

router.delete("/deletePost/:id", authJwt, postsController.deletePost);

module.exports = router;