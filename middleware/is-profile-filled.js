/** @format */

const { user: User } = require('../models');

module.exports = async (req, res, next) => {
  const { userId } = req.userLoggedin;
  const user = await User.findByPk(userId);
  console.log('ini hasil user', user);
  console.log('ini address', user.dataValues.address);
  if (
    user.dataValues.address == null ||
    user.dataValues.phone_number == null ||
    user.dataValues.city_id == null ||
    user.dataValues.profile_picture == null
  ) {
    res.status(400).json({
      message: 'Please complete your profile first!',
    });
  } else {
    next();
  }
};
