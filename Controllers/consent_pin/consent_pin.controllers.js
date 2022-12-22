const { v4 } = require("uuid");
const axios = require("axios");


/*http://localhost:8080/link/AbhaWithMobile
payload {
  "healthid":"himanshu0502"
}
response:{
  "txnId": """
}
*/

/*http://localhost:8080/link/verifyMobileOtp
  payload : {
    "txnId": "1c5366e7-deb9-4bd9-847c-4247249a6011",
    "otp":"244586"
  }
  response : {
    token:"",
    refreshToken:""
  }
*/
//  https://dev.abdm.gov.in/cm/patients/pin

module.exports.CreateConsentPin = (req, res) => {
  const { pin, token } = req.body;

  axios
    .post(
      "https://dev.abdm.gov.in/cm/patients/pin",
      { pin: pin },
      { headers: { "X-AUTH-TOKEN": `Bearer ${token}` } }
    )
    .then((respons) => {
      if (respons.data) {
        res.status(204).send({ message: "PIN created successfully." });
      }
    })
    .catch((error) => {
      if (error.message === "Request failed with status code 400") {
        res.status(200).send({ message: "Transaction Pin is already created" });
      } else if (error.message === "Request failed with status code 401") {
        res.status(401).send({ message: "Token is invalid" });
      } else if (error.message === "Request failed with status code 500") {
        res.status(500).send({ message: "Downstream services are down" });
      } else {
        res.status(401).send({ message: error.message });
      }
    });
};

module.exports.ConfirmConsentPin = (req, res) => {
  const { pin, token } = req.body;
  axios
    .post(
      `https://dev.abdm.gov.in/cm/patients/verify-pin`,
      {
        requestId: v4(),
        pin,
        scope: "consentrequest.approve",
      },
      { headers: { "X-AUTH-TOKEN": `Bearer ${token}` } }
    )
    .then((respons) => {
      if (respons.data) {
        res.status(200).send({ message: "Successful verification of PIN." });
      }
    })
    .catch((error) => {
      if (error.message === "Request failed with status code 400") {
        res.status(200).send({ message: "Transaction Pin is already created" });
      } else if (error.message === "Request failed with status code 401") {
        res.status(401).send({ message: "Token is invalid" });
      } else if (error.message === "Request failed with status code 500") {
        res.status(500).send({ message: "Downstream services are down" });
      } else {
        res.status(401).send({ message: error.message });
      }
    });
};

module.exports.ChangeConsentPin = (req, res) => {
  const { pin, token } = req.body;
  axios
    .post(
      `https://dev.abdm.gov.in/cm/patients/change-pin`,
      {
        pin,
      },
      { headers: { "X-AUTH-TOKEN": `${token}` } }
    )
    .then((respons) => {
      if (respons.data) {
        res.status(200).send({ message: "PIN updated successfully." });
      }
    })
    .catch((error) => {
      if (error.message === "Request failed with status code 400") {
        res.status(200).send({ message: "Transaction Pin is already created" });
      } else if (error.message === "Request failed with status code 401") {
        res.status(401).send({ message: "Token is invalid" });
      } else if (error.message === "Request failed with status code 500") {
        res.status(500).send({ message: "Downstream services are down" });
      } else {
        res.status(401).send({ message: error.message });
      }
    });
};

module.exports.ForgotConsentPinGenerateOTP = (req, res) => {
  const { token } = req.body;
  axios
    .post(`https://dev.abdm.gov.in/cm/patients/forgot-pin/generate-otp`, {
      headers: { "X-AUTH-TOKEN": `Bearer ${token}` },
    })
    .then((respons) => res.status(200).send(respons.data))
    .catch((err) => {
      res.status(401).send(err.message);
     
    });
};

module.exports.ForgotConsentPinVerifyOTP = (req, res) => {
  const { sessionId, value, token } = req.body;
  axios
    .post(
      `https://dev.abdm.gov.in/cm/patients/forgot-pin/validate-otp`,
      {
        sessionId,
        value,
      },
      { headers: { "X-AUTH-TOKEN": `Bearer ${token}` } }
    )
    .then((respons) => res.status(200).send(respons.data))
    .catch((err) => {
      res.status(401).send(err.message);
    
    });
};

module.exports.ForgotConsentPin = (req, res) => {
  const { pin, token } = req.body;
  axios
    .put(
      `https://dev.abdm.gov.in/cm/patients/reset-pin`,
      {
        sessionId,
        pin,
      },
      { headers: { "X-AUTH-TOKEN": `${token}` } }
    )
    .then((respons) => res.status(200).send(respons.data))
    .catch((err) => res.status(401).send(err.message));
};
