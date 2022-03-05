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
  caption: String,
  likes: {
    type: Number,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cloudinaryId: {
    type: String,
    required: true
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
