const NOTIFTY = require("../../Models/notify.modal");

module.exports.SendNotifyToUser = async (req, res) => {
  if (!req.body.userId) {
    res.status(401).send({ message: "missing details" });
  }
  let UserNotify = new NOTIFTY({
    ...req.body,
  });
  await UserNotify.save((err, succ) => {
    if (err) {
      res.status(401).send({
        message: "Something went wrong",
      });
    } else {
      res.status(200).send({
        message: "Notify sent successfully",
      });
    }
  });
};

module.exports.GetNotify = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.send({ message: "No data available" });
  } else {
    NOTIFTY.find({ userId: id }).exec((err, succ) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(succ);
      }
    });
  }
};

module.exports.EditingAsViewedNotification = async (req, res) => {
  await NOTIFTY.updateOne({ _id: req.body._id }, { isUnRead: false }).exec(
    (err, succ) => {
      if (succ) {
        res.status(200).send({ message: "viewed", acknowledgement: true });
      } else {
        res
          .status(400)
          .send({ message: "some thing went wrong", acknowledgement: false });
      }
    }
  );
};
