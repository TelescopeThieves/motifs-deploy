const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String    
  },
  tracks: {
    type: Array,
    default: []
  },
  likes: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, {timestamps: true}
);

module.exports = mongoose.model("Playlist", PlaylistSchema);