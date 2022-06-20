const router = require('express').Router();
const WishlistCtl = require('../controllers/wishlist');
const wishlist_path = '/api/v1/wishlist';

router.get(`${wishlist_path}`, WishlistCtl.getAll);
router.post(`${wishlist_path}`, WishlistCtl.create);
router.delete(`${wishlist_path}/:id`, WishlistCtl.delete);

module.exports = router;