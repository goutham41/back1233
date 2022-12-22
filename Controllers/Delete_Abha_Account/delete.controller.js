const axios  = require("axios")
const {JSEncrypt} = require('js-encrypt')

module.exports.deleteInit = async (req, res) => {
  const { healthid } = req.body;
  axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then((response) => {
      axios
        .post(
          `${process.env.BASE_URL}/v1/auth/init`,
          { authMethod: "MOBILE_OTP", healthid: healthid },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then((respons) => {
          res.status(200).send(respons.data);
          //console.log(respons.data);
        })
        .catch((err) => {
          //console.log(err.message);
          res.status(401).send(err.message);
        });
    });
};

module.exports.deleteConfirmOTP = async (req, res) => {
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
        .then((respons) => {
          res.status(200).send(respons.data);
          //console.log(respons.data);
        })
        .catch((err) => {
          //console.log(err.message);
          res.status(401).send(err.message);
        });
    });
};

//previous step generate X-Token which we used in this step
module.exports.deleteGenerateOTP = async (req, res) => {
  const { mobile, txnId, token } = req.body;
  axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then((response) => {
      axios
        .post(
          `${process.env.BASE_URL}/v2/account/mobile/generateOTP`,
          { mobileNumber: mobile, txnId},
          {
            headers: {
              Authorization: `Bearer ${response.data}`,
              "X-Token": `Bearer ${token}`,
            },
          }
        )
        .then((respons) => {
          //console.log(respons.data);
          res.status(200).send(respons.data);
        })
        .catch((err) => {
          //console.log(err.message);
          res.status(401).send(err.message);
        });
    });
};

// In this you get status 204 for confirmation of deactivation of Abha Id
// you have to enter encrypted otp from client
module.exports.deleteProfile = async(req,res)=>{
    const{otp,txnId,token} = req.body
    const encrypt = new JSEncrypt()
    const publicKey = `
      -----BEGIN PUBLIC KEY-----
      MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAstWB95C5pHLXiYW59qyO
      4Xb+59KYVm9Hywbo77qETZVAyc6VIsxU+UWhd/k/YtjZibCznB+HaXWX9TVTFs9N
      wgv7LRGq5uLczpZQDrU7dnGkl/urRA8p0Jv/f8T0MZdFWQgks91uFffeBmJOb58u
      68ZRxSYGMPe4hb9XXKDVsgoSJaRNYviH7RgAI2QhTCwLEiMqIaUX3p1SAc178ZlN
      8qHXSSGXvhDR1GKM+y2DIyJqlzfik7lD14mDY/I4lcbftib8cv7llkybtjX1Aayf
      Zp4XpmIXKWv8nRM488/jOAF81Bi13paKgpjQUUuwq9tb5Qd/DChytYgBTBTJFe7i
      rDFCmTIcqPr8+IMB7tXA3YXPp3z605Z6cGoYxezUm2Nz2o6oUmarDUntDhq/PnkN
      ergmSeSvS8gD9DHBuJkJWZweG3xOPXiKQAUBr92mdFhJGm6fitO5jsBxgpmulxpG
      0oKDy9lAOLWSqK92JMcbMNHn4wRikdI9HSiXrrI7fLhJYTbyU3I4v5ESdEsayHXu
      iwO/1C8y56egzKSw44GAtEpbAkTNEEfK5H5R0QnVBIXOvfeF4tzGvmkfOO6nNXU3
      o/WAdOyV3xSQ9dqLY5MEL4sJCGY1iJBIAQ452s8v0ynJG5Yq+8hNhsCVnklCzAls
      IzQpnSVDUVEzv17grVAw078CAwEAAQ==
      -----END PUBLIC KEY-----`;
      encrypt.setPublicKey(publicKey);
      const encrypted = encrypt.encrypt(otp);
    axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then((response) => {
      axios
        .post(
          `${process.env.BASE_URL}/v2/account/profile/delete`,
          {  "txnId": txnId,
          "otp":encrypted,
          "authMethod":"MOBILE_OTP" },
          {
            headers: {
              Authorization: `Bearer ${response.data}`,
              "X-Token": `Bearer ${token}`,
            },
          }
        )
        .then((respons) => {
          res.send(respons.data);
          //console.log(respons.data);
        })
        .catch((err) => {
          //console.log(err.message);
          res.status(401).send(err.message);
        });
    });
}
