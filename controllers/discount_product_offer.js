/** @format */

const {
  discount_product_offer: DiscProduct,
  product: Product,
  user: User,
  product_images: Product_Images,
  notification: Notification,
} = require('../models');
const sequelize = require('sequelize');

exports.getAll = (req, res, next) => {
  const status = ['pending', 'accepted', 'rejected'];
  DiscProduct.findAll({
    include: [
      {
        model: Product,
        as: 'product_offered',
        include: [
          {
            model: Product_Images,
            as: 'product_images',
          },
        ],
      },
      {
        model: User,
        as: 'bidder',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
      {
        model: User,
        as: 'seller_product_offer',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
    ],
    order: sequelize.literal(
      '(' +
        status
          .map(function (stat) {
            return '"discount_product_offer"."status" = \'' + stat + "'";
          })
          .join(', ') +
        ') DESC'
    ),
  })
    .then((disc_products) => {
      res.status(200).json({
        message: 'success',
        result: {
          disc_products,
          thumbnail: disc_products.map((disc_product) => {
            return disc_product.product_offered.product_images[disc_product.product_offered.product_images.length - 1].product_images_path;
          }),
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getBySeller = (req, res, next) => {
  const status = ['pending', 'accepted', 'rejected'];
  DiscProduct.findAll({
    include: [
      {
        model: Product,
        as: 'product_offered',
        include: [
          {
            model: Product_Images,
            as: 'product_images',
          },
        ],
      },
      {
        model: User,
        as: 'bidder',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
      {
        model: User,
        as: 'seller_product_offer',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
    ],
    order: sequelize.literal(
      '(' +
        status
          .map(function (stat) {
            return '"discount_product_offer"."status" = \'' + stat + "'";
          })
          .join(', ') +
        ') DESC'
    ),
    where: {
      seller_id: req.userLoggedin.userId,
    },
  })
    .then((disc_products) => {
      res.status(200).json({
        message: 'success',
        result: {
          disc_products,
          thumbnail: disc_products.map((disc_product) => {
            return disc_product.product_offered.product_images[disc_product.product_offered.product_images.length - 1].product_images_path;
          }),
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getByBidder = (req, res, next) => {
  const status = ['pending', 'accepted', 'rejected'];
  DiscProduct.findAll({
    include: [
      {
        model: Product,
        as: 'product_offered',
        include: [
          {
            model: Product_Images,
            as: 'product_images',
          },
        ],
      },
      {
        model: User,
        as: 'bidder',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
      {
        model: User,
        as: 'seller_product_offer',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
    ],
    order: sequelize.literal(
      '(' +
        status
          .map(function (stat) {
            return '"discount_product_offer"."status" = \'' + stat + "'";
          })
          .join(', ') +
        ') DESC'
    ),
    where: {
      user_id: req.userLoggedin.userId,
    },
  })
    .then((disc_products) => {
      res.status(200).json({
        message: 'success',
        result: {
          disc_products,
          thumbnail: disc_products.map((disc_product) => {
            return disc_product.product_offered.product_images[disc_product.product_offered.product_images.length - 1].product_images_path;
          }),
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getAllStatusPending = (req, res, next) => {
  DiscProduct.findAll({
    include: [
      {
        model: Product,
        as: 'product_offered',
        include: [
          {
            model: Product_Images,
            as: 'product_images',
          },
        ],
      },
      {
        model: User,
        as: 'bidder',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
      {
        model: User,
        as: 'seller_product_offer',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
    ],
    where: {
      status: 'pending',
      user_id: req.userLoggedin.userId,
    },
  })
    .then((disc_products) => {
      res.status(200).json({
        message: 'success',
        result: {
          disc_products,
          thumbnail: disc_products.map((disc_product) => {
            return disc_product.product_offered.product_images[disc_product.product_offered.product_images.length - 1].product_images_path;
          }),
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getAllStatusAccepted = (req, res, next) => {
  DiscProduct.findAll({
    include: [
      {
        model: Product,
        as: 'product_offered',
        include: [
          {
            model: Product_Images,
            as: 'product_images',
          },
        ],
      },
      {
        model: User,
        as: 'bidder',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
      {
        model: User,
        as: 'seller_product_offer',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
    ],
    where: {
      status: 'accepted',
      user_id: req.userLoggedin.userId,
    },
  })
    .then((disc_products) => {
      res.status(200).json({
        message: 'success',
        result: {
          disc_products,
          thumbnail: disc_products.map((disc_product) => {
            return disc_product.product_offered.product_images[disc_product.product_offered.product_images.length - 1].product_images_path;
          }),
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getAllStatusRejected = (req, res, next) => {
  DiscProduct.findAll({
    include: [
      {
        model: Product,
        as: 'product_offered',
        include: [
          {
            model: Product_Images,
            as: 'product_images',
          },
        ],
      },
      {
        model: User,
        as: 'bidder',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
      {
        model: User,
        as: 'seller_product_offer',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
    ],
    where: {
      status: 'rejected',
      user_id: req.userLoggedin.userId,
    },
  })
    .then((disc_products) => {
      res.status(200).json({
        message: 'success',
        result: {
          disc_products,
          thumbnail: disc_products.map((disc_product) => {
            return disc_product.product_offered.product_images[disc_product.product_offered.product_images.length - 1].product_images_path;
          }),
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getById = (req, res, next) => {
  DiscProduct.findOne({
    include: [
      {
        model: Product,
        as: 'product_offered',
        include: [
          {
            model: Product_Images,
            as: 'product_images',
          },
        ],
      },
      {
        model: User,
        as: 'bidder',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'phone_number'],
      },
      {
        model: User,
        as: 'seller_product_offer',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'phone_number'],
      },
    ],
    where: {
      id: req.params.id,
    },
  })
    .then((disc_product) => {
      res.status(200).json({
        message: 'success',
        result: {
          disc_product,
          thumbnail: disc_product.product_offered.product_images[disc_product.product_offered.product_images.length - 1].product_images_path,
          seller_phone_number: disc_product.seller_product_offer.phone_number,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

// exports.getAllStatusCancelled = (req, res, next) => {
//   DiscProduct.findAll({
//     where: {
//       status: 'cancelled',
//     },
//   })
//     .then((disc_products) => {
//       res.status(200).json({
//         message: 'success',
//         disc_products,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: 'error',
//         error: err.message,
//       });
//     });
// };

exports.createDiscProduct = async (req, res, next) => {
  const { bargain_price, product_id } = req.body;
  // const getProductId = await Product.findOne({
  //   where: {
  //     slug: req.params.slug,
  //   },
  // });
  const getSellerId = await Product.findOne({
    where: {
      id: product_id,
    },
    include: [
      {
        model: User,
        as: 'seller',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
    ],
  });
  // console.log('ini seller id', getSellerId.seller);
  DiscProduct.create({
    user_id: req.userLoggedin.userId,
    product_id,
    seller_id: getSellerId.seller.id,
    bargain_price,
    status: 'pending',
  })
    .then((disc_product) => {
      Notification.create({
        product_id: disc_product.product_id,
        bargain_price: disc_product.bargain_price,
        user_id: getSellerId.seller.id,
        action_message: 'Penawaran Produk',
      });
      res.status(200).json({
        message: 'success',
        disc_product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.deleteDiscProduct = (req, res, next) => {
  const { id } = req.params;
  DiscProduct.destroy({
    where: {
      id,
    },
  })
    .then((disc_product) => {
      res.status(200).json({
        message: 'success',
        disc_product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.rejectDiscProduct = async (req, res, next) => {
  const { id } = req.params;
  const { product_id } = req.body;
  await DiscProduct.update(
    {
      status: 'rejected',
    },
    {
      where: {
        user_id: id,
        product_id,
      },
    }
  )
    .then((disc_product) => {
      res.status(200).json({
        message: 'success',
        disc_product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.acceptDiscProduct = async (req, res, next) => {
  const { id } = req.params;
  const { product_id } = req.body;
  await DiscProduct.update(
    {
      status: 'accepted',
    },
    {
      where: {
        user_id: id,
        product_id,
      },
    }
  )
    .then((disc_product) => {
      res.status(200).json({
        message: 'success',
        disc_product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};
