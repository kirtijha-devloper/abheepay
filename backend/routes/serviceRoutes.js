const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/process', authMiddleware, serviceController.processTransaction);
router.get('/commissions', authMiddleware, serviceController.getCommissionPlans);

module.exports = router;
