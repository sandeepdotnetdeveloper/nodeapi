const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', authMiddleware.verifyToken, userController.getUserProfile);
//router.get('/profile',  userController.getUserProfile);

module.exports = router;
