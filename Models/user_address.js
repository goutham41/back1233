const mongoose = require("mongoose");

const UserAddressSchema = new mongoose.Schema(
  {
    fullName: String,
    address: String,
    pincode: Number,
    city: String,
    email: String,
    mobile: String,
    userId:String
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("address", UserAddressSchema);
