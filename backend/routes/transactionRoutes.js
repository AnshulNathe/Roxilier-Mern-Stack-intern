const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.getAllTransactions);
router.get('/:month', transactionController.getTransactionsByMonth);
router.get('/price-range/:month', transactionController.getPriceRangeData);
router.get('/category-wise/:month', transactionController.getCategoryWiseData);
module.exports = router;
