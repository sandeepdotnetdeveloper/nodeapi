const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/data', authMiddleware.verifyToken, dashboardController.getDashBoardData);


module.exports = router;
