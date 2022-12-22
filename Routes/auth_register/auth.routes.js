const express = require("express");
const {
  CreateYore_CreateAccount,
  YoreUser_login,
  getUserData,
  StoreAbha
} = require("../../Controllers/auth_register/auth.controller");
const validateRegister = require("../../middleware/validation");

const authRouter = express.Router();

authRouter.post("/login", YoreUser_login);

authRouter.post("/create", CreateYore_CreateAccount);
authRouter.post("/getUserData",getUserData)
authRouter.post("/store/abha",StoreAbha)
// authRouter.get("/refresh_token", authController.refreshToken);

// authRouter.get("/logout", authController.logout);

module.exports = authRouter;
