/** @format */

const { user: User } = require('../models');

module.exports = async (req, res, next) => {
  if (req.userLoggedin) {
    const { userId } = req.userLoggedin;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    // console.log('ini hasil user', user);
    // console.log('ini address', user.dataValues.address);
    if (user.address == null || user.phone_number == null || user.city_id == null || user.profile_picture == null) {
      return res.status(400).json({
        message: 'Please complete your profile first!',
      });
    }
  }
  next();
};
