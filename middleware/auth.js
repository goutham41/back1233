const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

    const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    if (!decoded)
      return res.status(400).json({ msg: "Invalid Authentication." });

    const user = await User.findOne({ phoneNumber: decoded.UserInfo.phoneNumber });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;