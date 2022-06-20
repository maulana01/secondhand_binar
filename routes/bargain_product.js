/** @format */

const router = require('express').Router();
const BargainProductCtl = require('../controllers/bargain_product');
const bargain_product_path = '/api/v1/bargain-product/';

router.get(`${bargain_product_path}/status/:status`, BargainProductCtl.getAllByStatus);
router.post(`${bargain_product_path}`, BargainProductCtl.createBargainProduct);
router.delete(`${bargain_product_path}/:id`, BargainProductCtl.deleteBargainProduct);

module.exports = router;
