/** @format */

const { wishlist: Wishlist, product_images: Product_Images, product: Product, user: User, category: Category } = require('../models');

module.exports = {
  getAll: (req, res, next) => {
    Wishlist.findAll({
      include: [
        {
          model: Product,
          as: 'wishlist_product',
          include: [
            {
              model: Product_Images,
              as: 'product_images',
            },
            {
              model: Category,
              as: 'category_product',
            },
          ],
        },
        {
          model: User,
          as: 'wishlist_user',
          attributes: ['email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
        },
      ],
      where: {
        user_id: req.userLoggedin.userId,
      },
    })
      .then((wishlists) => {
        return res.status(200).json({
          message: 'success',
          wishlists,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'error',
          error: err.message,
        });
      });
  },
  create: (req, res) => {
    Wishlist.create({
      user_id: req.userLoggedin.userId,
      product_id: req.body.product_id,
    })
      .then((result) => {
        return res.status(200).json({ message: 'Success', result });
      })
      .catch((err) => {
        return res.status(500).json({ message: 'Failed', err: err.message });
      });
  },
  delete: (req, res) => {
    Wishlist.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => {
        if (result === 0) {
          return res.status(404).json({
            message: 'Product dengan ID ' + req.params.id + ' Not Found',
            result,
          });
        } else {
          return res.status(200).json({ message: 'Success', result });
        }
      })
      .catch((err) => {
        return res.status(500).json({ message: 'Failed', err: err.message });
      });
  },
};
