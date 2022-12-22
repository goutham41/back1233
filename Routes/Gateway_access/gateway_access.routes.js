// gateway_access.routes.js
const router = require("express").Router();
const {
  Get_Gateway_access,
} = require("../../Controllers/gateway_access/gateway_access.controller");
router.get("/ndhm_access_token", Get_Gateway_access);
module.exports = router;
