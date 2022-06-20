const router = require("express").Router();
const TransactionCtl = require("../controllers/transaction");
const transaction_path = "/api/v1/transaction";
const IsAuth = require("../middleware/is-auth");

router.post(`${transaction_path}/create`, IsAuth, TransactionCtl.createRequest);
router.get(`${transaction_path}/all`, IsAuth, TransactionCtl.getAllRequest);
router.get(`${transaction_path}/:id`, IsAuth, TransactionCtl.getById);
router.delete(
  `${transaction_path}/delete/:id`,
  IsAuth,
  TransactionCtl.deleteTransaction
);

module.exports = router;
