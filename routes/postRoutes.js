const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });
const authJwt = require("../middleware/authJwt");


//Post Routes - simplified for now

router.post("/createPost", authJwt, upload.single("file"), postsController.createPost);

router.post("/playlist/create", authJwt, postsController.createPlaylist)

router.put("/addArt/:id", upload.single("file"), postsController.addArt);

router.put("/bookmarkPost/:id", authJwt, postsController.bookmarkPost);

router.put("/addToPlaylist/:trackId/:playlistId", authJwt, postsController.addToPlaylist);

router.put("/followArtist/:id", authJwt, postsController.followArtist);

router.put("/removeFromPlaylist/:trackId/:playlistId", authJwt, postsController.removeFromPlaylist);

router.delete("/deletePost/:id", authJwt, postsController.deletePost);

router.delete("/deletePlaylist/:id", authJwt, postsController.deletePlaylist);


module.exports = router;