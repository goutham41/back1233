const axios = require("axios")

module.exports.Get_Gateway_access = (req, res) => {
  axios
//   /gateway/v0.5/links/link/add-context
    .post("https://dev.abdm.gov.in/gateway/v0.5/sessions",{
        "clientId": `${process.env.CLIENT_ID}`,
        "clientSecret": `${process.env.CLIENT_SECRET}`  
    })
    .then((response) => {
        res.send(response.data.accessToken)
    })
    .catch((err)=>{
        console.log(err)
    })
};
