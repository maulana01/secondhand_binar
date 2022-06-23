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
    if (!user.address || !user.phone_number || !user.city_id || !user.profile_picture) {
      console.log('ini file dalem', req.files);
      return res.status(400).json({
        message: 'Please complete your profile first!',
      });
    }
    console.log('ini file luar', req.files);
  }
  next();
};
