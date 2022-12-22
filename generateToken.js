const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const generateAccessToken = (payload) => {
  return jwt.sign(payload, `${ACCESS_TOKEN_SECRET}`, { expiresIn: "15m" });
};

const generateRefreshToken = (payload, res) => {
  const refresh_token = jwt.sign(payload, `${REFRESH_TOKEN_SECRET}`, {
    expiresIn: "7d",
  });


  return refresh_token;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};