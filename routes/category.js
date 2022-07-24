/** @format */

const router = require('express').Router();
const CategoryCtl = require('../controllers/category');
const category_path = '/api/v1/category';

router.get(`${category_path}`, CategoryCtl.getAll);
router.get(`${category_path}/:slug`, CategoryCtl.getBySlug);

module.exports = router;
