/** @format */

const { user: User } = require('../models');

module.exports = (req, res, next) => {
  const { userId } = req.userLoggedin;
  User.findByPk(userId)
    .then((user) => {
      if (user.address == null || user.phone_number == null || user.city_id == null || user.profile_picture == null) {
        res.status(400).json({
          message: 'Please complete your profile first!',
        });
      } else {
        next();
      }
    })
    .catch((error) => {
      console.log('ini error nya', error);
    });
  // console.log('ini hasil user', user);
};
