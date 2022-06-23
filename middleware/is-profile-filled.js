/** @format */

const { user: User } = require('../models');

module.exports = (req, res, next) => {
  const { userId } = req.userLoggedin;
  User.findOne({
    where: {
      id: userId,
    },
  })
    .then((user) => {
      if (user.address == null || user.phone_number == null || user.city_id == null || user.profile_picture == null) {
        res.status(400).json({
          error: 'Please complete your profile first!',
        });
        // const error = new Error('Please complete your profile first!');
        // error.statusCode = 500;
        // throw error;
      }
      next();
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Failed',
        error: error.message,
      });
    });
};
