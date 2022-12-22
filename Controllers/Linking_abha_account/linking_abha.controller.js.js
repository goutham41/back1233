const axios = require("axios");

const LinkingViaMobile = (req, res) => {
  const { healthid } = req.body;
  axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then((response) => {
      axios
        .post(
          `${process.env.BASE_URL}/v1/auth/init`,
          { authMethod: "MOBILE_OTP", healthid },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then((respons) => res.status(200).send(respons.data))
        .catch((err) => res.status(401).send({ message: err.message }));
    });
};

const VerifyingViaMobile = (req, res) => {
  const { otp, txnId } = req.body;
  axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then((response) => {
      axios
        .post(
          `${process.env.BASE_URL}/v1/auth/confirmWithMobileOTP`,
          { otp, txnId },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then((respons) => res.status(200).send(respons.data))
        .catch((err) => res.status(401).send(err.message));
    });
};

const GetAbhaCard = (req, res) => {
  const { token } = req.body;
  axios
    .post(`${process.env.LOCALHOST_URL}/generateViaAadhar/getcard`, { token })
    .then(async (respon) => {
      res.status(200).send(respon.data);
    })
    .catch((err) => res.status(401).send(err.message));
};

const LinkingViaMobileResendOTP = async (req, res) => {
  const { txnId } = req.body;
  console.log(txnId)
  axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then((response) => {
      axios
        .post(
          `${process.env.BASE_URL}/v1/auth/resendAuthOTP`,
          {
            authMethod: "MOBILE_OTP",
            txnId,
          },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then((respons) => res.send(respons.data))
        .catch((err) => {
          res.status(401).send(err.response.data)
          console.log(err.response.data)
        });

    });
};
module.exports = {
  LinkingViaMobile,
  VerifyingViaMobile,
  GetAbhaCard,
  LinkingViaMobileResendOTP,
};
