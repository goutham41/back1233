const { Schema, model } = require("mongoose");
const { v4 } = require("uuid");

const UserSchema = new Schema(
  {
    displayName: { type: String },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    age: {
      type: String,
    },
    yearOfBirth: {
      type: String,
    },
    monthOfBirth: {
      type: String,
    },
    dayOfBirth: {
      type: String,
    },
    height: {
      type: String,
    },
    weight: {
      type: String,
    },
    healthIdNumber: {
      type: String,
    },
    AbhaAddress: {
      type: String,
    },
    profilePhoto: {
      type: String,
    },
    gender: {
      type: String,
    },
    yoreCare_status: {
      type: Boolean,
      default: false,
    },
    abhaCard_status: {
      type: Boolean,
      default: false,
    },
    cm_status: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: v4(),
    },
    photoURL: String,
    about: String,
    address: String,
    city: String,
    role: String,
    state: String,
    zipCode: String,
    token: String,
    abha_card: String,
  },

  { timestamps: true }
);

const UsersModel = new model("user", UserSchema);
module.exports = UsersModel;
