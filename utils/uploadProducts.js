/** @format */

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

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

exports.uploadImage = multer({
  storage: this.storageCloudinary,
});
