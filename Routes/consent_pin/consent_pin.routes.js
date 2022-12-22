const router = require("express").Router();
const {
  ConfirmConsentPin,
  CreateConsentPin,
  ChangeConsentPin,
  ForgotConsentPinGenerateOTP,
  ForgotConsentPinVerifyOTP,
  ForgotConsentPin
} = require("../../Controllers/consent_pin/consent_pin.controllers");

router.post("/createConsentPin", CreateConsentPin);
router.post("/confirmConsentPin", ConfirmConsentPin);
router.post("/ChangeConsentPin", ChangeConsentPin);
router.post("/ForgotConsentPinGenerateOTP", ForgotConsentPinGenerateOTP);
router.post("/ForgotConsentPinVerifyOTP", ForgotConsentPinVerifyOTP);
router.post("/SetForgotConsentPin",ForgotConsentPin);

module.exports = router;
