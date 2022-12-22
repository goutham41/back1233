const router = require("express").Router();
const { LinkingViaMobile, VerifyingViaMobile, GetAbhaCard,LinkingViaMobileResendOTP} = require("../../Controllers/Linking_abha_account/linking_abha.controller.js");
router.post("/AbhaWithMobile", LinkingViaMobile);
router.post("/verifyMobileOtp",VerifyingViaMobile)
router.post("/getAbhaCard",GetAbhaCard)
router.post("/linkingViaMobileResendOTP",LinkingViaMobileResendOTP)
module.exports = router;