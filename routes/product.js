/** @format */

const router = require('express').Router();
const ProductCtl = require('../controllers/product');
const product_path = '/api/v1/product';
const IsAuth = require('../middleware/is-auth');
const IsProfileFilled = require('../middleware/is-profile-filled');
const UploadUtil = require('../utils/uploadProducts');

router.get(`${product_path}`, ProductCtl.getAllWithPaginationSortingFiltering);
router.get(`${product_path}/category/:slug`, ProductCtl.getAllByCategory);
router.get(`${product_path}/user/:id`, ProductCtl.getAllBySeller);
router.get(`${product_path}/detail-with-auth/:slug`, IsAuth, ProductCtl.getProductDetailBySlugWithAuth);
router.get(`${product_path}/detail-no-auth/:slug`, ProductCtl.getProductDetailBySlugWithoutAuth);

router.post(
  `${product_path}`,
  UploadUtil.uploadImage.array('product_images_name', 5),
  IsAuth,
  IsProfileFilled,
  ProductCtl.createProducts,
  (error, req, res, next) => {
    return res.status(415).json({ message: 'Jumlah File Upload melewati batas' });
  }
);

router.put(
  `${product_path}/:slug`,
  UploadUtil.uploadImage.array('product_images_name', 5),
  IsAuth,
  IsProfileFilled,
  ProductCtl.updateProducts
);
router.delete(`${product_path}/image/:product_images_name`, IsAuth, IsProfileFilled, ProductCtl.deleteProductImages);
router.delete(`${product_path}/:slug`, IsAuth, IsProfileFilled, ProductCtl.deleteProduct);

module.exports = router;
