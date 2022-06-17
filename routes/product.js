/** @format */

const router = require('express').Router();
const ProductCtl = require('../controllers/product');
const product_path = '/api/v1/product';
const UploadUtil = require('../utils/uploadProducts');

router.get(`${product_path}`, ProductCtl.getAllWithPaginationSortingFiltering);
router.get(`${product_path}/:slug`, ProductCtl.getProductDetailBySlug);
router.get(`${product_path}/category/:slug`, ProductCtl.getAllByCategory);
router.get(`${product_path}/user/:username`, ProductCtl.getAllBySeller);
router.post(`${product_path}`, UploadUtil.uploadImage.array('product_images_name', 4), ProductCtl.createProducts);
router.put(`${product_path}/:slug`, UploadUtil.uploadImage.array('product_images_name', 4), ProductCtl.updateProducts);
router.delete(`${product_path}/:slug`, ProductCtl.deleteProduct);
router.delete(`${product_path}/image/:product_images_name`, ProductCtl.deleteProductImages);

module.exports = router;
