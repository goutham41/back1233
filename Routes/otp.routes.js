const express = require("express");

const otpController = require("../controller/otp.controller");

const otpRouter = express.Router();

otpRouter.post("/", otpController.sendOTP);
otpRouter.post("/resend", otpController.reSendOTP);
otpRouter.post("/verify", otpController.verifyOTP);

module.exports = otpRouter;