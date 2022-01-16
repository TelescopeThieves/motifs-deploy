const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

  artist: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  audio: {
    type: String,
    require: true,
  },
  art: String,
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cashAppLink: {
    type: String,
    required: true,
  },
  twitter: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Post", PostSchema);
