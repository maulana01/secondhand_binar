const {
  order_transaction: Transaction,
  user: User,
  product: Product,
} = require("../models");

exports.createRequest = async (req, res, next) => {
  const user_id = req.userLoggedin.userId || req.body.user_id;
  const { product_id, product_quantity, total_payment, status } = req.body;

  const user = await User.findByPk(user_id);
  const product = await Product.findByPk(product_id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  console.log({ user, product });

  return await Transaction.create({
    user_id,
    product_id,
    product_quantity,
    total_payment,
    status,
  })
    .then((transaction) =>
      res.status(201).json({
        message: "Transaction created",
        data: transaction,
      })
    )
    .catch((error) =>
      res.status(401).json({ message: "Error creating transaction", error })
    );
};

exports.getById = (req, res, next) => {
  const { id } = req.params;

  Transaction.findByPk(id)
    .then((transaction) => {
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      return res.status(200).json({
        message: "Transaction found",
        data: transaction,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Error getting transaction",
        error: err,
      });
    });
};

exports.getAllRequest = (req, res, next) => {
  Transaction.findAll()
    .then((transactions) => {
      if (!transactions) {
        return res.status(404).json({ message: "Transactions not found" });
      }
      return res.status(200).json({
        message: "Transactions found",
        data: transactions,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Error getting transactions",
        error: err,
      });
    });
};

exports.deleteTransaction = async (req, res, next) => {
  const id = req.params.id || req.body.id;

  const transaction = await Transaction.findByPk(id);
  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  return await transaction
    .destroy(id)
    .then((result) =>
      res.status(200).json({ message: "Transaction deleted", result })
    )
    .catch((error) =>
      res.status(401).json({ message: "Error deleting transaction", error })
    );
};
