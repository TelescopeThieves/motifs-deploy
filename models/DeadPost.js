const mongoose = require("mongoose");

const DeadPostSchema = new mongoose.Schema(
  {
    artist: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    art: {
      type: String,
      required: false
    },
    caption: {
      type: String,
      required: false,
    },
    bookmarkCount: {
      type: Number,
      required: true,
    },
    playCount: {
      type: Number,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeadPost", DeadPostSchema);
