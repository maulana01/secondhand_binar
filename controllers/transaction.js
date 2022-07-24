/** @format */

const {
  user: User,
  product: Product,
  Sequelize,
  product_images: Product_Images,
  category: Category,
  order_transaction: Transaction,
  notification: Notification,
  discount_product_offer: DiscProduct,
} = require('../models');
const { Op } = Sequelize;

exports.finishTransaction = async (req, res, next) => {
  const { accepted_bidder } = req.body;
  const { product_id } = req.params;
  const getDiscProductOffer = await DiscProduct.findOne({
    where: {
      product_id,
      user_id: accepted_bidder,
    },
  });
  await Product.update(
    {
      status: 'sold',
    },
    {
      where: {
        id: product_id,
      },
    }
  )
    .then((result) => {
      DiscProduct.update(
        {
          status: 'rejected',
        },
        {
          where: {
            product_id,
            user_id: {
              [Op.ne]: accepted_bidder,
            },
          },
        }
      );
      Transaction.create({
        product_id,
        user_id: accepted_bidder,
        total_payment: getDiscProductOffer.bargain_price,
        seller_id: req.userLoggedin.userId,
        status: 'success',
      });
      res.status(200).json({
        message: 'success',
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.cancelTransaction = async (req, res, next) => {
  const { accepted_bidder } = req.body;
  const { product_id } = req.params;
  DiscProduct.update(
    {
      status: 'rejected',
    },
    {
      where: {
        product_id,
        user_id: accepted_bidder,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        message: 'success',
        result,
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
  const { id } = req.params;
  Transaction.findByPk(id, {
    include: [
      {
        model: Product,
        as: 'order_transaction_product',
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
        as: 'order_transaction_user',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
      {
        model: User,
        as: 'order_transaction_seller',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
    ],
  })
    .then((transaction) => {
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      return res.status(200).json({
        message: 'Transaction found',
        data: transaction,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Error getting transaction',
        error: err.message,
      });
    });
};

exports.getAllRequest = (req, res, next) => {
  Transaction.findAll({
    include: [
      {
        model: Product,
        as: 'order_transaction_product',
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
        as: 'order_transaction_user',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
      {
        model: User,
        as: 'order_transaction_seller',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
    ],
    order: [['status', 'DESC']],
  })
    .then((transactions) => {
      return res.status(200).json({
        message: 'Transactions found',
        data: transactions,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Error getting transactions',
        error: err.message,
      });
    });
};

exports.getByBuyer = (req, res, next) => {
  const user_id = req.userLoggedin.userId;
  Transaction.findAll({
    where: {
      user_id,
    },
    include: [
      {
        model: Product,
        as: 'order_transaction_product',
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
        as: 'order_transaction_user',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
      {
        model: User,
        as: 'order_transaction_seller',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
    ],
  })
    .then((transactions) => {
      return res.status(200).json({
        message: 'Transactions found',
        data: transactions,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Error getting transactions',
        error: err.message,
      });
    });
};

exports.getBySeller = (req, res, next) => {
  const seller_id = req.userLoggedin.userId;
  Transaction.findAll({
    where: {
      seller_id,
    },
    include: [
      {
        model: Product,
        as: 'order_transaction_product',
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
        as: 'order_transaction_user',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
      {
        model: User,
        as: 'order_transaction_seller',
        attributes: ['id', 'email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
    ],
  })
    .then((transactions) => {
      return res.status(200).json({
        message: 'Transactions found',
        data: transactions,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Error getting transactions',
        error: err.message,
      });
    });
};

exports.deleteTransaction = async (req, res, next) => {
  const id = req.params.id || req.body.id;

  const transaction = await Transaction.findByPk(id);
  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  return await transaction
    .destroy(id)
    .then((result) => {
      return res.status(200).json({ message: 'Transaction deleted', result });
    })
    .catch((error) => {
      return res.status(401).json({ message: 'Error deleting transaction', error });
    });
};
