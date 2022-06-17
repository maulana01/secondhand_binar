/** @format */

const multer = require('multer');
// const path = require('path');

exports.storageImage = multer.diskStorage({
  destination: 'public/images/products',
  filename: function (req, file, cb) {
    // console.log('ini file', file);
    const product_name = req.body.product_name ? req.body.product_name : 'product_name';
    const slug = product_name.trim().replace(/\s+/g, '-').toLowerCase();
    cb(null, Date.now() + '-' + slug + '-' + file.originalname);
  },
});

exports.uploadImage = multer({
  storage: this.storageImage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed'));
    }
  },
});
