/** @format */

const {
  order_transaction: Transaction,
  user: User,
  product: Product,
  discount_product_offer: DiscProduct,
  notification: Notification,
} = require('../models');

exports.createRequest = async (req, res, next) => {
  const user_id = req.userLoggedin.userId;
  const { discount, total_payment, product_id } = req.body;

  console.log({ discount, total_payment, product_id });

  const user = await User.findByPk(user_id);
  const product = await Product.findByPk(product_id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!product) {
    return res.status(404).json({ message: 'Product not found', id: product_id });
  }

  // const disc_product = await DiscProduct.findOne({
  //   where: {
  //     user_id,
  //     status: 'accepted',
  //   },
  // })

  Notification.create({
    product_id: product.id,
    user_id: user_id,
    bargain_price: total_payment,
    action_message: 'Ada transaksi masuk!',
  });

  return await Transaction.create({
    user_id,
    product_id,
    discount,
    total_payment,
    status: 'pending',
  })
    .then((transaction) => {
      res.status(201).json({
        message: 'Transaction created',
        data: transaction,
      });
    })
    .catch((error) => res.status(401).json({ message: 'Error creating transaction', error }));
};

exports.getById = (req, res, next) => {
  const { id } = req.params;

  Transaction.findByPk(id)
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
  Transaction.findAll()
    .then((transactions) => {
      if (!transactions) {
        return res.status(404).json({ message: 'Transactions not found' });
      }
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
    .then((result) => res.status(200).json({ message: 'Transaction deleted', result }))
    .catch((error) => res.status(401).json({ message: 'Error deleting transaction', error }));
};
