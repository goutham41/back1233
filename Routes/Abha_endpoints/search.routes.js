const {
  searchByHealthId,
  GetStateCode,
  SearchDoctorByName,
  SearchDoctorBySpeciality,
  searchByHospital,

  searchByHospitalByHealthId

} = require("../../Controllers/Registration_aadhaar/search");

const router = require("express").Router();

router.post("/byHealthId", searchByHealthId);
router.get("/statecode", GetStateCode);

router.post("/searchDoctorByName", SearchDoctorByName);
router.post("/SearchDoctorBySpeciality", SearchDoctorBySpeciality);
router.post("/searchByHospital", searchByHospital);
router.get("/searchByHospitalByHealthId/:id", searchByHospitalByHealthId);
// searchByHospitalByHealthId
module.exports = router;
