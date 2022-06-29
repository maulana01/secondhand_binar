const { notification: Notification } = require("../models");

exports.getNotification = (req, res, next) => {
  Notification.findAll({
    where: {
      user_id: req.userLoggedin.userId,
    },
  })
    .then((notification) => {
      return res.status(200).json({
        message: "success",
        notification,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "error",
        data: err,
      });
    });
};

exports.getAllNotification = (req, res, next) => {
  Notification.findAll()
    .then((notification) => {
      return res.status(200).json({
        message: "success",
        notification,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "error",
        data: err,
      });
    });
};
