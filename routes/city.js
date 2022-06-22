/** @format */

const router = require('express').Router();
const CityCtl = require('../controllers/city');
const city_path = '/api/v1/city';

router.get(`${city_path}`, CityCtl.getAll);
router.get(`${city_path}/:id`, CityCtl.getById);

module.exports = router;
