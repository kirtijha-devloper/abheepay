const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const auth = require('../middleware/authMiddleware');
const rbac = require('../middleware/rbacMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-login-otp', authController.verifyLoginOtp);
router.post('/impersonate/:id', auth, rbac.requireDownlineAccess, authController.impersonate);

module.exports = router;
