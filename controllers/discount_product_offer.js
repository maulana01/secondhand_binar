/** @format */

const {
  discount_product_offer: DiscProduct,
  product: Product,
  user: User,
  product_images: Product_Images,
  category: Category,
  notification: Notification,
} = require('../models');
const sequelize = require('sequelize');
const moment = require('moment');
// require('moment/locale/id');
require('moment/dist/locale/id');

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
          {
            model: Category,
            as: 'category_product',
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
      return res.status(200).json({
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
      return res.status(500).json({
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
          {
            model: Category,
            as: 'category_product',
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
      return res.status(200).json({
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
      return res.status(500).json({
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
          {
            model: Category,
            as: 'category_product',
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
      return res.status(200).json({
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
      return res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getAllStatusPendingBidder = (req, res, next) => {
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
          {
            model: Category,
            as: 'category_product',
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
      return res.status(200).json({
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
      return res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getAllStatusPendingSeller = (req, res, next) => {
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
          {
            model: Category,
            as: 'category_product',
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
      seller_id: req.userLoggedin.userId,
    },
  })
    .then((disc_products) => {
      return res.status(200).json({
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
      return res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getAllStatusAcceptedBidder = (req, res, next) => {
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
          {
            model: Category,
            as: 'category_product',
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
      return res.status(200).json({
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
      return res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getAllStatusAcceptedSeller = (req, res, next) => {
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
          {
            model: Category,
            as: 'category_product',
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
      seller_id: req.userLoggedin.userId,
    },
  })
    .then((disc_products) => {
      return res.status(200).json({
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
      return res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getAllStatusRejectedBidder = (req, res, next) => {
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
          {
            model: Category,
            as: 'category_product',
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
      return res.status(200).json({
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
      return res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getAllStatusRejectedSeller = (req, res, next) => {
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
          {
            model: Category,
            as: 'category_product',
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
      seller_id: req.userLoggedin.userId,
    },
  })
    .then((disc_products) => {
      return res.status(200).json({
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
      return res.status(500).json({
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
          {
            model: Category,
            as: 'category_product',
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
      id: req.params.id,
    },
  })
    .then((disc_product) => {
      Notification.update(
        {
          is_read: true,
        },
        {
          where: {
            product_id: disc_product.product_offered.id,
            user_id: req.userLoggedin.userId,
          },
        }
      );
      return res.status(200).json({
        message: 'success',
        result: {
          disc_product,
          thumbnail: disc_product.product_offered.product_images[disc_product.product_offered.product_images.length - 1].product_images_path,
          seller_phone_number: disc_product.seller_product_offer.phone_number,
          createdAt: moment(disc_product.createdAt, 'h:mm:ss A').locale('id').format('DD MMM, HH:mm'),
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.createDiscProduct = async (req, res, next) => {
  const { bargain_price, product_id } = req.body;
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
  await DiscProduct.create({
    user_id: req.userLoggedin.userId,
    product_id,
    seller_id: getSellerId.seller.id,
    bargain_price,
    status: 'pending',
  })
    .then((disc_product) => {
      Notification.create({
        product_id,
        bargain_price,
        user_id: getSellerId.seller.id,
        action_message: 'Penawaran Produk',
        additional_info_1: 'Ditawar ',
        additional_info_2: null,
        is_read: false,
        url: `/dashboard/tawaran/${disc_product.id}`,
      });
      Notification.create({
        product_id,
        bargain_price,
        user_id: req.userLoggedin.userId,
        action_message: 'Penawaran Produk',
        additional_info_1: 'Ditawar ',
        additional_info_2: null,
        is_read: false,
        url: `/detail/` + getSellerId.slug,
      });

      return res.status(200).json({
        message: 'success',
        disc_product,
      });
    })
    .catch((err) => {
      return res.status(500).json({
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
      return res.status(200).json({
        message: 'success',
        disc_product,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.acceptDiscProduct = async (req, res, next) => {
  const { user_id } = req.params;
  const { product_id } = req.body;
  const getDiscProductOffer = await DiscProduct.findOne({
    where: {
      user_id,
      product_id,
    },
    include: [
      {
        model: Product,
        as: 'product_offered',
      },
    ],
  });
  await DiscProduct.update(
    {
      status: 'accepted',
    },
    {
      where: {
        user_id,
        product_id,
      },
    }
  )
    .then((disc_product) => {
      Notification.create({
        product_id,
        bargain_price: getDiscProductOffer.bargain_price,
        user_id,
        action_message: 'Penawaran Produk',
        additional_info_1: 'Berhasil Ditawar ',
        additional_info_2: 'Kamu akan segera dihubungi penjual via whatsapp',
        is_read: false,
        url: `/detail/` + getDiscProductOffer.product_offered.slug,
      });
      return res.status(200).json({
        message: 'success',
        disc_product,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.rejectDiscProduct = async (req, res, next) => {
  const { user_id } = req.params;
  const { product_id } = req.body;
  const getDiscProductOffer = await DiscProduct.findOne({
    where: {
      user_id,
      product_id,
    },
    include: [
      {
        model: Product,
        as: 'product_offered',
      },
    ],
  });
  await DiscProduct.update(
    {
      status: 'rejected',
    },
    {
      where: {
        user_id,
        product_id,
      },
    }
  )
    .then((disc_product) => {
      Notification.create({
        product_id,
        bargain_price: getDiscProductOffer.bargain_price,
        user_id,
        action_message: 'Penawaran Produk',
        additional_info_1: 'Tawaran Ditolak ',
        additional_info_2: 'Harap tawar ulang atau pilih produk lain.',
        is_read: false,
        url: `/detail/` + getDiscProductOffer.product_offered.slug,
      });
      return res.status(200).json({
        message: 'success',
        disc_product,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};
