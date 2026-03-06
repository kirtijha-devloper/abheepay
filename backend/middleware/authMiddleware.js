const jwt = require('jsonwebtoken');


const prisma = require('../config/db');

/**
 * Middleware to protect routes using JWT authentication.
 * Verifies token, fetches user, and attaches to req.user.
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided, authorization denied.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Invalid token format.' });
    }

    // Use the same secret as in authController.js
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super-secret-key-change-in-production');

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found or deactivated.' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Your account is deactivated. Contact Admin.' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired. Please login again.' });
    }
    console.error('Auth middleware error:', error.message);
    res.status(401).json({ success: false, message: 'Token is not valid.' });
  }
};

module.exports = authMiddleware;
