/** @format */

const { discount_product_offer: DiscProduct, product: Product } = require('../models');

exports.getAll = (req, res, next) => {
  DiscProduct.findAll({
    order: [['status', 'DESC']],
  })
    .then((disc_products) => {
      res.status(200).json({
        message: 'success',
        disc_products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

// exports.getAllStatusPending = (req, res, next) => {
//   DiscProduct.findAll({
//     where: {
//       status: 'pending',
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

// exports.getAllStatusSuccess = (req, res, next) => {
//   DiscProduct.findAll({
//     where: {
//       status: 'accepted',
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

// exports.getAllStatusFailed = (req, res, next) => {
//   DiscProduct.findAll({
//     where: {
//       status: 'failed',
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
  const { cut_price } = req.body;
  const getProductId = await Product.findOne({
    where: {
      slug: req.params.slug,
    },
  });
  DiscProduct.create({
    user_id: req.userLoggedin.userId,
    product_id: getProductId.id,
    cut_price,
    status: 'pending',
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

exports.rejectDiscProduct = (req, res, next) => {
  const { id } = req.params;
  DiscProduct.update(
    {
      status: 'rejected',
    },
    {
      where: {
        id,
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

exports.acceptDiscProduct = (req, res, next) => {
  const { id } = req.params;
  DiscProduct.update(
    {
      status: 'accepted',
    },
    {
      where: {
        id,
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
