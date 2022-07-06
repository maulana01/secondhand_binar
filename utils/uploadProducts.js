/** @format */

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
// const path = require('path');

cloudinary.config({
  cloud_name: 'dcdu2v41u',
  api_key: '189369424679696',
  api_secret: 'xO_NsHIMoLR3yqPLraq0I0yKbC0',
});

exports.storageCloudinary = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: 'public/images/products',
      allowed_formats: ['jpg', 'png', 'jpeg'],
    };
  },
});

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
  storage: this.storageCloudinary,
});
