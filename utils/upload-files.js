const path = require("path");
const multer = require("multer");

exports.uploadAvatar = () => {
  const storageImage = multer.diskStorage({
    destination: "public/images/avatar",
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  return multer({ storage: storageImage, fileFilter: fileFilter });
};
