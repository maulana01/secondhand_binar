/** @format */

const router = require('express').Router();
const TransactionCtl = require('../controllers/transaction');
const transaction_path = '/api/v1/transaction';
const IsAuth = require('../middleware/is-auth');

router.get(`${transaction_path}`, IsAuth, TransactionCtl.getAllRequest);
router.get(`${transaction_path}/buyer`, IsAuth, TransactionCtl.getByBuyer);
router.get(`${transaction_path}/:id`, IsAuth, TransactionCtl.getById);
router.put(`${transaction_path}/success/:product_id`, IsAuth, TransactionCtl.finishTransaction);
router.put(`${transaction_path}/cancel/:product_id`, IsAuth, TransactionCtl.cancelTransaction);
// router.post(`${transaction_path}/create`, IsAuth, TransactionCtl.createRequest);
// router.delete(`${transaction_path}/delete/:id`, IsAuth, TransactionCtl.deleteTransaction);

module.exports = router;
