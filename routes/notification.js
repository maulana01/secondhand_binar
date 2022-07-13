/** @format */

const router = require('express').Router();
const NotificationCtl = require('../controllers/notification');
const notification_path = '/api/v1/notification';
const IsAuth = require('../middleware/is-auth');

router.get(`${notification_path}`, IsAuth, NotificationCtl.getNotification);
router.get(`${notification_path}/:id`, IsAuth, NotificationCtl.getById);
// router.get(`${notification_path}`, IsAuth, NotificationCtl.getAllNotification);

module.exports = router;
