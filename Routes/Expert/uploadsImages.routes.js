const { Router } = require("express");
const {
  UploadBase64Images,
  GetBase64Images,
  DeleteBase64Image,
  EditingBase64Image,
} = require("../../Controllers/Locker/uploads.controller");
const fileExtLimiter = require("../../middleware/Records/fileExtLimiter");
const fileSizeLimiter = require("../../middleware/Records/fileSizeLimiter");

const UploadImages = Router();
// const verifyJWT = require("../middleware/verifyJWT");
// UploadImages.use(verifyJWT);
UploadImages.post(
  "/upload_images",
  fileExtLimiter([".png", ".jpg", ".jpeg", ".pdf"]),
  fileSizeLimiter,
  UploadBase64Images
);
UploadImages.get("/get_images/:phoneNumber", GetBase64Images);
UploadImages.delete("/delete_image/:id", DeleteBase64Image);
UploadImages.post("/editing_base64_image", EditingBase64Image);
// EditingBase64Image
module.exports = UploadImages;
