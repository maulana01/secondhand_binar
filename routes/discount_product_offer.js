/** @format */

const router = require('express').Router();
const DiscProductOfferCtl = require('../controllers/discount_product_offer');
const disc_product_offer_path = '/api/v1/disc-product-offer';
const IsAuth = require('../middleware/is-auth');

router.get(`${disc_product_offer_path}`, IsAuth, DiscProductOfferCtl.getAll);
router.get(`${disc_product_offer_path}/:id`, IsAuth, DiscProductOfferCtl.getById);
router.get(`${disc_product_offer_path}/seller`, IsAuth, DiscProductOfferCtl.getBySeller);
router.get(`${disc_product_offer_path}/status/pending`, IsAuth, DiscProductOfferCtl.getAllStatusPending);
router.get(`${disc_product_offer_path}/status/accepted`, IsAuth, DiscProductOfferCtl.getAllStatusAccepted);
router.get(`${disc_product_offer_path}/status/rejected`, IsAuth, DiscProductOfferCtl.getAllStatusRejected);
router.post(`${disc_product_offer_path}`, IsAuth, DiscProductOfferCtl.createDiscProduct);
router.put(`${disc_product_offer_path}/accept/:id`, IsAuth, DiscProductOfferCtl.acceptDiscProduct);
router.put(`${disc_product_offer_path}/reject/:id`, IsAuth, DiscProductOfferCtl.rejectDiscProduct);
router.delete(`${disc_product_offer_path}/:id`, DiscProductOfferCtl.deleteDiscProduct);

module.exports = router;
