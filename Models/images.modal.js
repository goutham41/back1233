const { Schema, model } = require("mongoose");

const ImageSchema = new Schema(
  {
    images: { type: Array },
    recordType: String,
    phoneNumber: String,
    documentName: String,
  },
  { timestamps: true }
);

const Image = model("Image", ImageSchema);
module.exports = Image;
