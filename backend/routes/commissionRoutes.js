const express = require('express');
const router = express.Router();
const commissionController = require('../controllers/commissionController');

const authMiddleware = require('../middleware/authMiddleware');

// PG Charges
router.get('/pg', commissionController.getPGCharges);
router.post('/pg', commissionController.createPGCharge);
router.put('/pg/:id', commissionController.updatePGCharge);
router.delete('/pg/:id', commissionController.deletePGCharge);

// User PG Charge Overrides
router.get('/pg/my-rates', authMiddleware, commissionController.getMyPGRates);
router.get('/pg/user-overrides', commissionController.getUserPGChargeOverrides);
router.post('/pg/user-overrides', commissionController.saveUserPGChargeOverrides);

// Service Fees (Account Verification)
router.get('/service-fees', commissionController.getServiceFees);
router.post('/service-fees', commissionController.createServiceFee);
router.put('/service-fees/:id', commissionController.updateServiceFee);
router.delete('/service-fees/:id', commissionController.deleteServiceFee);

// Payout Charge Slabs
router.get('/payout-slabs', commissionController.getPayoutChargeSlabs);
router.post('/payout-slabs', commissionController.createPayoutChargeSlab);
router.put('/payout-slabs/:id', commissionController.updatePayoutChargeSlab);
router.delete('/payout-slabs/:id', commissionController.deletePayoutChargeSlab);

module.exports = router;
