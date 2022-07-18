/** @format */

const router = require('express').Router();
const DiscProductOfferCtl = require('../controllers/discount_product_offer');
const disc_product_offer_path = '/api/v1/disc-product-offer';
const IsAuth = require('../middleware/is-auth');
const IsProfileFilled = require('../middleware/is-profile-filled');

router.get(`${disc_product_offer_path}`, IsAuth, DiscProductOfferCtl.getAll);
router.get(`${disc_product_offer_path}/seller`, IsAuth, DiscProductOfferCtl.getBySeller);
router.get(`${disc_product_offer_path}/seller/status/pending`, IsAuth, DiscProductOfferCtl.getAllStatusPendingSeller);
router.get(`${disc_product_offer_path}/seller/status/accepted`, IsAuth, DiscProductOfferCtl.getAllStatusAcceptedSeller);
router.get(`${disc_product_offer_path}/seller/status/rejected`, IsAuth, DiscProductOfferCtl.getAllStatusRejectedSeller);
router.get(`${disc_product_offer_path}/bidder`, IsAuth, DiscProductOfferCtl.getByBidder);
router.get(`${disc_product_offer_path}/bidder/status/pending`, IsAuth, DiscProductOfferCtl.getAllStatusPendingBidder);
router.get(`${disc_product_offer_path}/bidder/status/accepted`, IsAuth, DiscProductOfferCtl.getAllStatusAcceptedBidder);
router.get(`${disc_product_offer_path}/bidder/status/rejected`, IsAuth, DiscProductOfferCtl.getAllStatusRejectedBidder);
router.get(`${disc_product_offer_path}/:id`, IsAuth, DiscProductOfferCtl.getById);
router.post(`${disc_product_offer_path}`, IsAuth, IsProfileFilled, DiscProductOfferCtl.createDiscProduct);
router.put(`${disc_product_offer_path}/accept/:user_id`, IsAuth, IsProfileFilled, DiscProductOfferCtl.acceptDiscProduct);
router.put(`${disc_product_offer_path}/reject/:user_id`, IsAuth, IsProfileFilled, DiscProductOfferCtl.rejectDiscProduct);
router.delete(`${disc_product_offer_path}/:id`, IsAuth, IsProfileFilled, DiscProductOfferCtl.deleteDiscProduct);

module.exports = router;
