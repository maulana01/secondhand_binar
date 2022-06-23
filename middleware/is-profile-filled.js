/** @format */

const { user: User } = require('../models');

module.exports = async (req, res, next) => {
  if (req.userLoggedin) {
    const { product_name, product_desc, product_price, category_id, product_images_name } = req.body;
    const { userId } = req.userLoggedin;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    // console.log('ini address', user.dataValues.address);
    if (!user.address || !user.phone_number || !user.city_id || !user.profile_picture) {
      // console.log('ini file dalem', req.files);
      // console.log('ini hasil user', user);
      return res.status(400).json({
        message: 'Please complete your profile first!',
      });
    }
  }
  next();
};
