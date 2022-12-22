const Images = require("../../Models/images.modal");

module.exports.UploadBase64Images = async (req, res) => {
  if (req.body.images.length === 0) {
    res.status(401).send({ message: "Images required" });
  } else {
    let UserImages = new Images({
      ...req.body,
    });
    await UserImages.save((err, succ) => {
      if (err) {
        res.status(401).send({
          message: "Something went wrong",
        });
      } else {
        res.status(200).send({
          message: "Images successfully stored",
        });
      }
    });
  }
};

module.exports.GetBase64Images = async (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  console.log(phoneNumber);
  if (!phoneNumber) {
    res.send({ message: "No data available" });
  } else {
    Images.find({ phoneNumber }).exec((err, succ) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(succ);
      }
    });
  }
};

module.exports.DeleteBase64Image = async (req, res) => {
  Images.deleteOne({ _id: req.params.id }).exec((err, succ) => {
    if (err) {
      res
        .status(404)
        .send({ message: "Something went wrong", acknowledgement: false });
    } else {
      res
        .status(200)
        .send({ message: "Deleted successfully", acknowledgement: true });
    }
  });
};

module.exports.EditingBase64Image = async (req, res) => {
  console.log( req.body._id, req.body.documentName)
  await Images.updateOne(
    { _id: req.body._id },
    { documentName: req.body.documentName }
  ).exec((err, succ) => {
    if (succ) {
      res
        .status(200)
        .send({ message: "Document  updated", acknowledgement: true });
    } else {
      res
        .status(400)
        .send({ message: "Something went wrong", acknowledgement: false });
    }
  });
};
