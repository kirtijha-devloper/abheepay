const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController');
const authMiddleware = require('../middleware/authMiddleware');

// Using /api/settings/banks for these endpoints
router.get('/', bankController.getBanks);
router.post('/', authMiddleware, bankController.createBank);
router.put('/:id', authMiddleware, bankController.updateBank);
router.delete('/:id', authMiddleware, bankController.deleteBank);

module.exports = router;
