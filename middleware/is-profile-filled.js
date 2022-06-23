/** @format */

const { user: User } = require('../models');

module.exports = async (req, res, next) => {
  const { userId } = req.userLoggedin;
  const user = await User.findByPk(userId);
  // console.log('ini hasil user', user);
  try {
    if (user.address != null || user.phone_number != null || user.city_id != null || user.profile_picture != null) {
      next();
    } else {
      const error = new Error('Please complete your profile first!');
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    res.status(500).json({
      message: 'Failed',
      error: error.message,
    });
  }
};
