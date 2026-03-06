const express = require('express');
const router = express.Router();
const fundController = require('../controllers/fundController');
const auth = require('../middleware/authMiddleware');
const rbac = require('../middleware/rbacMiddleware');

// Raise fund request (Any logged in user)
router.post('/request', auth, fundController.raiseFundRequest);

// Get fund requests (Users see theirs, Admin sees all)
router.get('/requests', auth, fundController.getFundRequests);

// Update fund request status (Superior can update downline requests)
router.patch('/status/:id', auth, rbac.requireRole(['ADMIN', 'SUPER_DISTRIBUTOR', 'MASTER_DISTRIBUTOR', 'DISTRIBUTOR']), fundController.updateFundRequestStatus);

module.exports = router;
