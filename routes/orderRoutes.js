const express = require('express');
const ordersController = require('../controllers/ordersController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/List', authMiddleware.verifyToken, ordersController.getOrders);
router.post('/OnlineList', authMiddleware.verifyToken, ordersController.getOrdersOnline);
router.post('/OrderBonusPaymentList', authMiddleware.verifyToken, ordersController.getOrderBonusPaymentReport);
router.put('/UpdateBonusPaymentStatus', authMiddleware.verifyToken, ordersController.updateBonusPaymentStatusByAdmin);
router.get('/logs/:id', authMiddleware.verifyToken, ordersController.getCustomerOnlineTransactionLogs);




module.exports = router;
