const validateRegister = async (req, res, next) => {
  const { fullname, mobile, email, password } = req.body;
  console.log(mobile,typeof mobile)
  if(!fullname && !mobile && !email && !password){
    return res
    .status(400)
    .json({ msg: "Please fill all the data" });
  }
  else if (!fullname) {
    return res.status(400).json({ msg: "Please add your full name." });
  }

  // ? mobile

  else if (mobile.length !== 10) {
    return res
      .status(400)
      .json({ msg: "Your mobile number must be 10 characters long." });
  }

  // ? email
  else if (!email) {
    return res.status(400).json({ msg: "Please add your email." });
  }
  
  //password
  else if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: "Your password must be at least 6 characters long." });
  }
  next();
};


module.exports = validateRegister;
