/** @format */

const router = require('express').Router();
const UserCtl = require('../controllers/user');
const IsAuth = require('../middleware/is-auth');
const { uploadAvatar: upload } = require('../utils/upload-files');
const user_path = '/api/v1/user';

router.get(`${user_path}/all`, UserCtl.getAll);
router.get(`${user_path}/my-profile`, IsAuth, UserCtl.getMyProfile);
router.get(`${user_path}/:slug`, UserCtl.getBySlug);
router.post(`${user_path}/create`, IsAuth, UserCtl.create);
// router.put(`${user_path}/update/:id`, IsAuth, UserCtl.update);
router.put(`${user_path}/update`, IsAuth, upload().single('profile_picture'), UserCtl.update);
router.delete(`${user_path}/delete/:id`, IsAuth, UserCtl.delete);
router.put(`${user_path}/upload/avatar/:id`, IsAuth, upload().single('profile_picture'), UserCtl.uploadAvatar);
router.post(`${user_path}/password/forgot`, UserCtl.forgotPassword);
router.post(`${user_path}/password/reset/:id`, UserCtl.resetPassword);
router.post(`${user_path}/otp/verify`, UserCtl.verifyOtp);

module.exports = router;
