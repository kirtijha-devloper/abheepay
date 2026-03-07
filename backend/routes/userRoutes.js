const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/list', authMiddleware, userController.listUsers);
router.get('/stats', authMiddleware, userController.getUserStats);
router.post('/add', authMiddleware, userController.addUser);
router.get('/staff', authMiddleware, userController.getStaff);
router.get('/potential-parents', authMiddleware, userController.getPotentialParents);
router.put('/:id', authMiddleware, userController.updateUser);

module.exports = router;
