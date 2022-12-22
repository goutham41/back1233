const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    img1: String,
    desc:String,
    company:String,
    newPrice: { type: Number},


    rating:Number,

    offer:Number,
    quantity: { default: "1", type: String },
    userId: { type: String, required: true },
    productId: { type: String },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", cartSchema);
