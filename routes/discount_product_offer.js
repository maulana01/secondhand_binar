/** @format */

const router = require('express').Router();
const DiscProductOfferCtl = require('../controllers/discount_product_offer');
const disc_product_offer_path = '/api/v1/disc-product-offer';
const IsAuth = require('../middleware/is-auth');
const IsProfileFilled = require('../middleware/is-profile-filled');

router.get(`${disc_product_offer_path}`, IsAuth, IsProfileFilled, DiscProductOfferCtl.getAll);
router.get(`${disc_product_offer_path}/seller`, IsAuth, IsProfileFilled, DiscProductOfferCtl.getBySeller);
router.get(`${disc_product_offer_path}/bidder`, IsAuth, IsProfileFilled, DiscProductOfferCtl.getByBidder);
router.get(`${disc_product_offer_path}/status/pending`, IsAuth, IsProfileFilled, DiscProductOfferCtl.getAllStatusPending);
router.get(`${disc_product_offer_path}/status/accepted`, IsAuth, IsProfileFilled, DiscProductOfferCtl.getAllStatusAccepted);
router.get(`${disc_product_offer_path}/status/rejected`, IsAuth, IsProfileFilled, DiscProductOfferCtl.getAllStatusRejected);
router.get(`${disc_product_offer_path}/:id`, IsAuth, IsProfileFilled, DiscProductOfferCtl.getById);
router.put(`${disc_product_offer_path}/tawaran/accept/:id`, IsAuth, DiscProductOfferCtl.acceptDiscProduct);
router.put(`${disc_product_offer_path}/tawaran/reject/:id`, IsAuth, DiscProductOfferCtl.rejectDiscProduct);
router.post(`${disc_product_offer_path}`, IsAuth, IsProfileFilled, DiscProductOfferCtl.createDiscProduct);
router.delete(`${disc_product_offer_path}/:id`, IsAuth, IsProfileFilled, DiscProductOfferCtl.deleteDiscProduct);

module.exports = router;
