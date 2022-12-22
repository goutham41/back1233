// gateway_access.routes.js
const router = require("express").Router();
const { deactivateInit, deactivateConfirmOTP, deactivateGenerateOTP, deactivateProfile } = require("../../Controllers/Deactivate_Abha_Account/deactivate.controller");
const { deleteInit, deleteConfirmOTP, deleteGenerateOTP, deleteProfile } = require("../../Controllers/Delete_Abha_Account/delete.controller");
const {
  getQrCode,
  generateAadhaarOtp,
  verifyAadhaarOtp,
  generateMobileOtp,
  verifyMobileOtp,
  createHealthId,
  getUserData,
  mobileResendOtp,
  AadhaarResendOtp,
  retrieveHealthIdByAadhaar,
  retrieveHealthIdByAadhaarVerify,
  retrieveHealthIdByMobile,
  retrieveHealthIdByMobileVerify,
  GetAbhaCard,
} = require("../../Controllers/Registration_aadhaar/Registration_aadhaar");
router.post("/generateAadhaarOtp", generateAadhaarOtp);
router.post("/verifyAadhaarOtp", verifyAadhaarOtp);
router.post("/generateMobileOtp", generateMobileOtp);
router.post("/verifyMobileOtp", verifyMobileOtp);
router.post("/createHealthId", createHealthId);
router.post("/getQrCode", getQrCode);
router.post("/getUserData", getUserData);
router.post("/mobileResendOtp", mobileResendOtp);
router.post("/AadhaarResendOtp", AadhaarResendOtp);
router.post("/retrieveHealthIdByAadhaar", retrieveHealthIdByAadhaar);
router.post(
  "/retrieveHealthIdByAadhaarVerify",
  retrieveHealthIdByAadhaarVerify
);
router.post("/retrieveHealthIdByMobile", retrieveHealthIdByMobile);
router.post("/retrieveHealthIdByMobileVerify", retrieveHealthIdByMobileVerify);
router.post("/getcard", GetAbhaCard);
router.post("/deactivateInit",deactivateInit)
router.post("/deactivateConfirmOTP",deactivateConfirmOTP)
router.post("/deactivateGenerateOTP",deactivateGenerateOTP)
router.post("/deactivateProfile",deactivateProfile)
router.post("/deleteInit",deleteInit)
router.post("/deleteConfirmOTP",deleteConfirmOTP)
router.post("/deleteGenerateOTP",deleteGenerateOTP)
router.post("/deleteProfile",deleteProfile)
module.exports = router;
