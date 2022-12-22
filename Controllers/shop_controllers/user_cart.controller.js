const user_cart = require("../../Models/user_chart");
const shortId = require("shortid");
const { Schema, default: mongoose } = require("mongoose");
const schema = new Schema();
const ProductSchema = mongoose.model("products", schema);

const UserAddress = require("../../Models/user_address");

module.exports.GetProducts = async (req, res) => {
  ProductSchema.find().exec((err, succ) => {
    if (succ) {
      res.status(200).send(succ);
    } else {
      res
        .status(404)
        .send({ message: "Data not Found", acknowledgement: false });
    }
  });
};

module.exports.GetProductById = async (req, res) => {
  ProductSchema.findOne({ _id: req.params.id }).exec((err, succ) => {
    if (succ) {
      res.status(200).send(succ);
    } else {
      res
        .status(404)
        .send({ message: "Data not Found", acknowledgement: false });
    }
  });
};

module.exports.AddUserCartProducts = async (req, res) => {
  // console.log(req.body)
  if (!req.body.userId) {
    res.status(400).send({ message: "Not authorized" });
  }
  let isPresent = await user_cart
    .findOne({ userId: req.body.userId, productId: req.body._id })
    .exec();
  console.log(isPresent);
  if (isPresent !== null) {
    res.status(200).send({
      message: "Already present in your cart",
      acknowledgement: false,
    });
  } else {
    const newProduct = new user_cart({
      img1: req.body.img1,
      desc: req.body.desc,
      company: req.body.company,
      newPrice: req.body.newPrice,
      offer: req.body.offer,
      userId: req.body.userId,
      productId: req.body._id,
    });
    await newProduct.save((err, succ) => {
      if (err) {
        res
          .status(404)
          .send({ message: "some thing went wrong", acknowledgement: false });
      } else {
        res
          .status(200)
          .send({ message: "Added successfully", acknowledgement: true });
      }
    });
  }
};

module.exports.GetUserCartProducts = async (req, res) => {
  user_cart.find({ userId: req.params.id }).exec((err, succ) => {
    if (succ) {
      res.status(200).send(succ);
    } else {
      res.status(400).send({ message: "users data not found" });
    }
  });
};

module.exports.DeleteUserCartProduct = async (req, res) => {
  user_cart.findByIdAndDelete({ _id: req.params.id }).exec((err, succ) => {
    if (err) {
      res
        .status(404)
        .send({ message: "some thing went wrong", acknowledgement: false });
    } else {
      res
        .status(200)
        .send({ message: "Deleted successfully", acknowledgement: true });
    }
  });
};

module.exports.EditingUserCartProduct = async (req, res) => {
  await user_cart
    .updateOne(
      { productId: req.body.productId, userId: req.body.userId },
      { quantity: req.body.quantity }
    )
    .exec((err, succ) => {
      if (succ) {
        res
          .status(200)
          .send({ message: "Quantity updated", acknowledgement: true });
      } else {
        res
          .status(400)
          .send({ message: "some thing went wrong", acknowledgement: false });
      }
    });
};

module.exports.PostUserAddress = async (req, res) => {
  if (!req.body.userId) {
    res.status(400).send("userId required");
  }
  const newAddress = new UserAddress({
    ...req.body,
  });
  await newAddress.save((err, succ) => {
    if (err) {
      res
        .status(404)
        .send({ message: "some thing went wrong", acknowledgement: false });
    } else {
      res
        .status(200)
        .send({ message: "Saved successfully", acknowledgement: true });
    }
  });
};

module.exports.GetUserAddress = async (req, res) => {
  // userId
  UserAddress.find({ userId: req.params.id }).exec((err, succ) => {
    if (succ) {
      res.status(200).send(succ);
    } else {
      res
        .status(401)
        .send({ message: "Some thing went wrong", acknowledgement: false });
    }
  });
};

module.exports.DeleteUserAddress = async (req, res) => {
  UserAddress.findByIdAndDelete({ _id: req.params.id }).exec((err, succ) => {
    if (err) {
      res
        .status(404)
        .send({ message: "some thing went wrong", acknowledgement: false });
    } else {
      res
        .status(200)
        .send({ message: "Deleted successfully", acknowledgement: true });
    }
  });
};

module.exports.EditingUserAddress = async (req, res) => {
  console.log(req.body);
  await UserAddress.replaceOne(
    { _id: req.body._id, userId: req.body.userId },
    {
      fullName: req.body.fullName,
      address: req.body.address,
      pincode: req.body.pincode,
      city: req.body.city,
      email: req.body.email,
      mobile: req.body.mobile,
      userId: req.body.userId,
    }
  ).exec((err, succ) => {
    if (succ) {
      res
        .status(200)
        .send({ message: "Address Modified", acknowledgement: true });
    } else {
      res
        .status(400)
        .send({ message: "some thing went wrong", acknowledgement: false });
    }
  });
};
