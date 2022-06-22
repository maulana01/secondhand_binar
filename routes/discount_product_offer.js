/** @format */

const router = require('express').Router();
const DiscProductOfferCtl = require('../controllers/discount_product_offer');
const disc_product_offer_path = '/api/v1/disc-product-offer/';

router.get(`${disc_product_offer_path}`, DiscProductOfferCtl.getAll);
router.post(`${disc_product_offer_path}`, DiscProductOfferCtl.createDiscProduct);
router.delete(`${disc_product_offer_path}/:id`, DiscProductOfferCtl.deleteDiscProduct);

module.exports = router;
