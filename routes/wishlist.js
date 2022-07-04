/** @format */

const router = require('express').Router();
const WishlistCtl = require('../controllers/wishlist');
const wishlist_path = '/api/v1/wishlist';
const IsAuth = require('../middleware/is-auth');

router.get(`${wishlist_path}`, IsAuth, WishlistCtl.getAll);
router.post(`${wishlist_path}`, IsAuth, WishlistCtl.create);
router.delete(`${wishlist_path}/:id`, IsAuth, WishlistCtl.delete);

module.exports = router;
