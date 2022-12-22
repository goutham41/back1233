const { Router } = require("express");
const {
  SendNotifyToUser,
  GetNotify,
  EditingAsViewedNotification,
} = require("../../Controllers/notify/notify");

const NotiftyRouter = Router();
NotiftyRouter.post("/notifty_send", SendNotifyToUser);
NotiftyRouter.get("/:id", GetNotify);
NotiftyRouter.post("/viewed", EditingAsViewedNotification);
module.exports = NotiftyRouter;
