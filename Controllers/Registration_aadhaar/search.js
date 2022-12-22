const axios = require("axios");
const mongoose = require("mongoose");
const moment = require("moment");
const { v4 } = require("uuid");
const HEROKUCALLBACK_URL = "https://calm-atoll-38553.herokuapp.com";
const timestamp = moment.utc().format("YYYY-MM-DDTHH:mm:ss.SSSSSS");
const searchByHealthId = (req, res) => {
  const { healthId } = req.body;
  axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then((response) => {
      axios
        .post(
          `${process.env.BASE_URL}/v1/search/existsByHealthId`,
          { healthId: healthId },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then((respons) => res.status(200).send(respons.data.status))
        .catch((err) => res.status(401).send(err.message));
    });
};
const StateCode = mongoose.model("statecodes", {
  name: { type: String },
  age: { type: Number },
});
const GetStateCode = async (req, res) => {
  StateCode.find().exec((err, succ) => {
    if (err) {
      return res.status(401).send({
        status: false,
        message: "Data not found",
      });
    } else {
      return res.status(200).send(succ);
    }
  });
};
const SearchDoctorByName = (req, res) => {
  const { name, typeOfConsultation, city } = req.body;
  axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then((response) => {
      console.log(response.data);
      axios
        .post(
          `https://uhigatewaysandbox.abdm.gov.in/api/v1/search`,
          {
            context: {
              domain: "nic2004:85111",
              country: "IND",
              city: `${city}`,
              action: "search",
              core_version: "0.7.1",
              message_id: `${v4()}`,
              timestamp: `${timestamp}`,
              consumer_id: `${v4()}`,
              consumer_uri: `${HEROKUCALLBACK_URL}/${name}`,
              transaction_id: `${v4()}`,
            },
            message: {
              intent: {
                fulfillment: {
                  agent: {
                    name,
                  },
                  type: typeOfConsultation,
                },
              },
            },
          },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then((respons) => res.status(200).send(respons.data))
        .catch((err) => res.status(401).send(err.message));
    });
};
const SearchDoctorBySpeciality = (req, res) => {
  const { Speciality, typeOfConsultation, city } = req.body;
  axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then((response) => {
      axios
        .post(
          `https://uhigatewaysandbox.abdm.gov.in/api/v1/search`,
          {
            context: {
              domain: "nic2004:85111",
              country: "IND",
              city: `${city}`,
              action: "search",
              core_version: "0.7.1",
              message_id: `${v4()}`,
              timestamp: `${timestamp}`,

              consumer_id: `${v4()}`,
              consumer_uri: `${HEROKUCALLBACK_URL}/${Speciality}`,

              transaction_id: `${v4()}`,
            },
            message: {
              intent: {
                category: {
                  descriptor: {
                    name: Speciality,
                  },
                },
                fulfillment: {
                  type: typeOfConsultation,
                },
              },
            },
          },
          { headers: { Authorization: `Bearer ${response.data}` } }
        )
        .then((respons) => res.status(200).send(respons.data))
        .catch((err) => res.status(401).send(err.message));
    });
};



const searchByHospital = (req, res) => {
  const { ownershipCode, pincode, stateLGDCode } = req.body;
  axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then((response) => {
      axios
        .post(
          "https://facilitysbx.abdm.gov.in/FacilityManagement/v1.5/facility/search",
          {
            ownershipCode: ownershipCode,
            stateLGDCode: stateLGDCode,
            districtLGDCode: "",
            subDistrictLGDCode: "",
            pincode: pincode,
            facilityName: "hospital",
            facilityId: "",
            page: 1,
            resultsPerPage: 100,
          },
          { headers: { Authorization: `Bearer ${response.data} ` } }
        )
        .then((respons) => res.status(200).send(respons.data))
        .catch((err) => res.status(401).send(err.message));
    });
};

const searchByHospitalByHealthId = (req, res) => {
  const { id } = req.params;
  
  axios
    .get(`${process.env.LOCALHOST_URL}/gateway/ndhm_access_token`)
    .then((response) => {
      axios
        .post(
          "https://facilitysbx.abdm.gov.in/FacilityManagement/v1.5/facility/search",
          {
            ownershipCode: "",
            stateLGDCode: "",
            districtLGDCode: "",
            subDistrictLGDCode: "",
            pincode: "",
            facilityName: "",
            facilityId: id,
            page: 1,
            resultsPerPage: 100,
          },
          { headers: { Authorization: `Bearer ${response.data} ` } }
        )
        .then((respons) => res.status(200).send(respons.data))
        .catch((err) => res.status(401).send(err));
    });
};
module.exports = {
  searchByHealthId,
  GetStateCode,
  SearchDoctorByName,
  SearchDoctorBySpeciality,
  searchByHospital,

  searchByHospitalByHealthId

};
