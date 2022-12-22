const crypto = require("crypto");
const UsersModel = require("../Models/user.model");
const emailValidator = require("deep-email-validator");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const { CourierClient } = require("@trycourier/courier");
const courier = CourierClient({
  authorizationToken: process.env.COURIER_TOKEN,
});

const register = async (req, res) => {
  try {
    const { fullname, mobile, email, password } = req.body;

    // checking email
    const emailExist = await UsersModel.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    //checking mobile number
    const contactExist = await UsersModel.findOne({ mobile });
    if (contactExist) {
      return res.status(400).json({ msg: "Mobile number already exists" });
    }

    // email validation
    async function isEmailValid(email) {
      return emailValidator.validate(email);
    }
    const { valid, reason, validators } = await isEmailValid(email);

    if (valid) {
      const hash = crypto
        .pbkdf2Sync(password, "ADSIndia2022", 60, 64, "sha256")
        .toString("hex");
      const newUser = new UsersModel({
        fullname,
        mobile,
        email,
        password: hash,
        status: true,
      });

      const createUser = await newUser.save();

      courier.send({
        message: {
          to: {
            phone_number: `${mobile}`,
          },
          content: {
            title: "XYZ Verification",
            body: `Hi ${fullname},\nYour verification code for XYZ is ${generateRandomNumber()}. `,
          },
          routing: {
            method: "single",
            channels: ["sms"],
          },
        },
      });

      // const accessToken = signAccessToken({ id: createUser._id });
      // const refreshToken = signRefreshToken({ id: createUser._id });

      // res.cookie("refreshtoken", refreshToken, {
      //   httpOnly: true,
      //   path: "/auth/refresh_token",
      //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      //   secure: true,
      // });

      res.json({
        status: "ok",
        msg: "OTP send successfully",
        //   accessToken,
      });
    } else {
      return res.status(400).send({
        message: "Please provide a valid email address.",
        reason: validators[reason].reason,
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

function generateRandomNumber() {
  var minm = 100000;
  var maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}

module.exports = register;
