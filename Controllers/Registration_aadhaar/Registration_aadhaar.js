// eslint
const axios = require("axios");
const fs = require("fs");
// const {parse, stringify} = require('flatted');
const userDataModal = require("../../Models/user.model");

const generateAadhaarOtp = async (req, res) => {
  const { aadhaar } = req.body;

  await axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then(async (response) => {
      await axios
        .post(
          `${process.env.BASE_URL}/v1/registration/aadhaar/generateOtp`,
          { aadhaar: aadhaar },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )      
        .then((respons) => {
          console.log(respons.data);
          res.send(respons.data);
        })
        .catch((err) => res.status(401).send(err.message));
    })
    .catch((err) => res.status(401).send(err.message));
};

const verifyAadhaarOtp = async (req, res) => {
  const { otp, txnId } = req.body;
  await axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then(async (response) => {
      await axios
        .post(
          `${process.env.BASE_URL}/v1/registration/aadhaar/verifyOTP`,
          { otp, txnId },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then((respons) => res.send(respons.data))
        .catch((err) => res.status(401).send(err.message));
    })
    .catch((err) => res.status(401).send(err.message));
};

const generateMobileOtp = async (req, res) => {
  const { mobile, txnId } = req.body;
  await axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then(async (response) => {
      await axios
        .post(
          `${process.env.BASE_URL}/v1/registration/aadhaar/generateMobileOTP`,
          { mobile, txnId },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then((respons) => res.send(respons.data))
        .catch((err) => res.status(401).send(err.message));
    })
    .catch((err) => res.status(401).send(err.message));
};

const verifyMobileOtp = async (req, res) => {
  const { otp, txnId } = req.body;
  await axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then(async (response) => {
      await axios
        .post(
          `${process.env.BASE_URL}/v1/registration/aadhaar/verifyMobileOTP`,
          { otp, txnId },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then((respons) => res.send(respons.data))
        .catch((err) => res.status(401).send(err.message));
    });
};

const createHealthId = async (req, res) => {
  const { email, firstName, healthId, lastName, password, txnId } = req.body;
  await axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then(async (response) => {
      await axios
        .post(
          `${process.env.BASE_URL}/v1/registration/aadhaar/createHealthIdWithPreVerified`,
          { email, firstName, healthId, lastName, password, txnId },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then(async (respons) => {
          console.log(respons.data);
          await axios
            .get(`${process.env.BASE_URL}/v1/account/getSvgCard`, {
              headers: {
                Authorization: `Bearer ${response.data}`,
                "X-Token": `Bearer ${respons.data.token}`,
                "content-type": "text/html",
              },
            })
            .then(async (respon) => {
              res.status(200).send(respon.data);
            })
            .catch((err) => res.status(401).send(err.message));
        })
        .catch((err) => res.status(401).send(err.message));
    });
};

const getQrCode = async (req, res) => {
  const { email, firstName, healthId, lastName, password, txnId } = req.body;
  await axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then(async (response) => {
      await axios
        .post(
          `${process.env.BASE_URL}/v1/registration/aadhaar/createHealthIdWithPreVerified`,
          { email, firstName, healthId, lastName, password, txnId },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then(async (respons) => {
          await axios
            .get(`${process.env.BASE_URL}/v1/account/qrCode`, {
              headers: {
                Authorization: `Bearer ${response.data}`,
                "X-Token": `Bearer ${respons.data.token}`,
                "Content-Type": "image/png",
              },
            })
            .then((respon) => {
              //console.log(respon.data);
              const imageAsBase64 = fs.readFileSync(`${respon.data}`, "base64");
              // stringify(respon);
              res.status(200).send(imageAsBase64);
            });
        })
        .catch((err) => res.status(401).send(err.message));
    });
};

const GetAbhaCard = async (req, res) => {
  const { token } = req.body;
  await axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then(async (response) => {
      await axios
        .get(`${process.env.BASE_URL}/v1/account/getSvgCard`, {
          headers: {
            Authorization: `Bearer ${response.data}`,
            "X-Token": `Bearer ${token}`,
            "Content-Type": "image/svg",
          },
        })
        .then((respon) => {
          res.status(200).send(respon.data);
        })
        .catch((err) => res.status(401).send(err.message));
    });
};

const mobileResendOtp = async (req, res) => {
  const { txnId } = req.body;
  await axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then(async (response) => {
      await axios
        .post(
          `${process.env.BASE_URL}/v2/registration/mobile/resendOtp`,
          { txnId },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then((respons) => res.send(respons.data))
        .catch((err) => res.status(401).send(err.message));
    });
};

const AadhaarResendOtp = async (req, res) => {
  const { txnId } = req.body;
  await axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then(async (response) => {
      await axios
        .post(
          `${process.env.BASE_URL}/v1/registration/aadhaar/resendAadhaarOtp`,
          { txnId },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then((respons) => {
          console.log(respons.data);
          res.send(respons.data);
        })
        .catch((err) => res.status(401).send(err.message));
    });
};

const retrieveHealthIdByAadhaar = async (req, res) => {
  const { aadhaar } = req.body;
  await axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then(async (response) => {
      await axios
        .post(
          `${process.env.BASE_URL}/v1/forgot/healthId/aadhaar/generateOtp`,
          { aadhaar: aadhaar },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then((respons) => {
          res.send(respons.data);
          console.log(respons.data);
        })
        .catch((err) => {
          console.log(err.message);
          res.status(401).send(err.message);
        });
    });
};

const retrieveHealthIdByAadhaarVerify = async (req, res) => {
  const { otp, txnId } = req.body;
  await axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then(async (response) => {
      await axios
        .post(
          `${process.env.BASE_URL}/v1/forgot/healthId/aadhaar`,
          { otp, txnId },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then((respons) => res.send(respons.data))
        .catch((err) => res.status(401).send(err.message));
    });
};

const retrieveHealthIdByMobile = async (req, res) => {
  const { mobile } = req.body;
  await axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then(async (response) => {
      await axios
        .post(
          `${process.env.BASE_URL}/v1/forgot/healthId/mobile/generateOtp`,
          { mobile },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then((respons) => res.send(respons.data))
        .catch((err) => res.status(401).send(err.message));
    });
};

const retrieveHealthIdByMobileVerify = async (req, res) => {
  const { otp, txnId, yearOfBirth, name, firstName, gender } = req.body;
  await axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then(async (response) => {
      await axios
        .post(
          `${process.env.BASE_URL}/v1/forgot/healthId/mobile`,
          { otp, txnId, yearOfBirth, name, firstName, gender },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then((respons) => res.send(respons.data))
        .catch((err) => res.status(401).send(err.message));
    });
};

const getUserData = async (req, res) => {
  const { healthId } = req.body;
  await userDataModal.findOne({ healthId }).exec((err, succ) => {
    if (err) {
      res.status(401).send({ message: "Invalid Credentials" });
    } else {
      //console.log(succ.qrCode)
      res.status(200).send(succ);
    }
  });
};

module.exports = {
  generateAadhaarOtp,
  generateMobileOtp,
  verifyAadhaarOtp,
  verifyMobileOtp,
  createHealthId,
  getQrCode,
  getUserData,
  mobileResendOtp,
  retrieveHealthIdByAadhaar,
  retrieveHealthIdByAadhaarVerify,
  retrieveHealthIdByMobile,
  retrieveHealthIdByMobileVerify,
  GetAbhaCard,
  AadhaarResendOtp,
};