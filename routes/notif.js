/** @format */

const router = require('express').Router();
const NotificationCtl = require('../controllers/notification');
const isAuth = require('../middleware/is-auth');
const notification_path = '/api/v1/notification';

router.get(`${notification_path}`, isAuth, NotificationCtl.getNotification);
router.get(`${notification_path}/all`, NotificationCtl.getAllNotification);

module.exports = router;
