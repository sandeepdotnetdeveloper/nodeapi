const express = require('express');
const vendorController = require('../controllers/vendorController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/List', authMiddleware.verifyToken, vendorController.getVendorList);
router.post('/AddList', authMiddleware.verifyToken, vendorController.addVendor);
router.get('/LogisticAddress/:id', authMiddleware.verifyToken, vendorController.getVendorAddress);
router.post('/updateVendorAddress', authMiddleware.verifyToken, vendorController.updateVendorAddress);



module.exports = router;
