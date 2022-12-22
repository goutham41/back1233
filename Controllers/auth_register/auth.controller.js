const crypto = require("crypto");
const UsersModel = require("../../Models/user.model");
const emailValidator = require("deep-email-validator");
const jwt = require("jsonwebtoken");

module.exports.YoreUser_login = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    //checking phoneNumber number
    if (phoneNumber === undefined) {
      return res.json({ message: "Invalid phoneNumber number" });
    }
    const contactExist = await UsersModel.findOne({ phoneNumber }).exec();
    console.log(contactExist);
    if (contactExist) {
      const accessToken = jwt.sign(
        {
          UserInfo: {
            phoneNumber: contactExist.phoneNumber,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10d" }
      );

      await UsersModel.updateOne(
        { phoneNumber: req.body.phoneNumber },
        { token: accessToken }
      ).exec((err, succ) => {
        if (succ) {
          res.status(200).json({
            accessToken,
            message: "Loggedin successfully",
            multipleSteps: false,
            user: contactExist,
          });
        }
      });
    } else {
      return res.status(401).json({
        msg: "user not found",
        status: true,
      });
    }
  } catch (error) {
    return res.status(401).json({ msg: error.message });
  }
};

module.exports.CreateYore_CreateAccount = async (req, res) => {
  const { displayName, phoneNumber, email, age, height, weight,gender } = req.body;

  const isExist = await UsersModel.findOne({ phoneNumber });
  if (isExist) {
    res.send({ message: "already account present" });
  } else {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          phoneNumber: phoneNumber,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10d" }
    );

    const User = new UsersModel({
      phoneNumber,
      displayName,
      email,
      age,
      height,
      weight,
      gender,
      yoreCare_status: true,
      token: accessToken,
      photoURL: "https://source.boringavatars.com/",
      mobile: "1",
    });

    User.save((err, succ) => {
      if (succ) {
        res.status(201).json(succ);
      } else {
        res.status(401).send(err);
      }
    });
  }
};

module.exports.getUserData = async (req, res) => {
  const { token } = req.body;
  console.log(token);
  await UsersModel.findOne({ token: token }).exec((err, succ) => {
    if (succ) {
      const payload = {
        accessToken: succ.accessToken,
        message: "Loggedin successfully",
        multipleSteps: false,
        user: succ,
      };
      res.status(200).send(payload);
    } else {
      res.status(401).send(err);
    }
  });
};

module.exports.StoreAbha = async (req, res) => {
  await UsersModel.updateOne(
    { phoneNumber: req.body.phoneNumber },
    { abha_card: req.body.abhaCard }
  ).exec((err, succ) => {
    if (succ) {
      res.status(200).json({
        message: "Abha Card successfully",
      });
    } else {
      res.send(err);
    }
  });
};
// const refreshToken = jwt.sign(
//   {
//     phoneNumber: phoneNumber,
//     displayName: displayName,
//     email: email,
//   },
//   process.env.REFRESH_TOKEN_SECRET,
//   { expiresIn: "7d" }
// );
