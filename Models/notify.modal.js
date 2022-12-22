const mongoose = require("mongoose");

const notifySchema = new mongoose.Schema(
  {
    userId: String,
    title: String,
    avatar: String,
    description: String,
    isUnRead: { type: Boolean, default: true },
    link: String,
    type: String,
  },
  {
    timestamps: true,
  }
);

const notifyModel = mongoose.model("notify", notifySchema);

module.exports = notifyModel;
