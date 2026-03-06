const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/kyc/' });
const kycController = require('../controllers/kycController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/submit', authMiddleware, upload.fields([
  { name: 'aadharFront', maxCount: 1 },
  { name: 'aadharBack', maxCount: 1 },
  { name: 'panImage', maxCount: 1 },
  { name: 'bankDoc', maxCount: 1 }
]), kycController.submitKYC);

router.get('/pending', authMiddleware, kycController.listPendingKYC);
router.post('/review', authMiddleware, kycController.reviewKYC);

module.exports = router;
