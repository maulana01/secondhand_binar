/** @format */

const router = require('express').Router();
const ProductCtl = require('../controllers/product');
const product_path = '/api/v1/product';
const IsAuth = require('../middleware/is-auth');
// const IsProfileFilled = require('../middleware/is-profile-filled');
const UploadUtil = require('../utils/uploadProducts');

function IsProfileFilled(req, res, next) {
  const { userId } = req.userLoggedin;
  User.findByPk(userId).then((user) => {
    if (user.address == null || user.phone_number == null || user.city_id == null || user.profile_picture == null) {
      // res.status(400).json({
      //   message: 'Please complete your profile first!',
      // });
      const error = new Error('Please complete your profile first!');
      error.statusCode = 400;
      throw error;
    } else {
      next();
    }
  });
}

router.get(`${product_path}`, ProductCtl.getAllWithPaginationSortingFiltering);
router.get(`${product_path}/:slug`, ProductCtl.getProductDetailBySlug);
router.get(`${product_path}/category/:slug`, ProductCtl.getAllByCategory);
router.get(`${product_path}/user/:slug`, ProductCtl.getAllBySeller);
router.post(
  `${product_path}`,
  IsAuth,
  IsProfileFilled,
  UploadUtil.uploadImage.array('product_images_name', 4),
  ProductCtl.createProducts,
  (error, req, res, next) => {
    res.status(415).json({ message: 'Jumlah File Upload melewati batas' });
  }
);
router.put(
  `${product_path}/:slug`,
  IsAuth,
  IsProfileFilled,
  UploadUtil.uploadImage.array('product_images_name', 4),
  ProductCtl.updateProducts
);
router.delete(`${product_path}/:slug`, IsAuth, IsProfileFilled, ProductCtl.deleteProduct);
router.delete(`${product_path}/image/:product_images_name`, IsAuth, IsProfileFilled, ProductCtl.deleteProductImages);

module.exports = router;
