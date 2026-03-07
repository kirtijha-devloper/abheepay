const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail, sendOTPSMS } = require('../utils/otpSender');

/**
 * Register a new user
 * Hierarchy: ADMIN > SUPER_DISTRIBUTOR > MASTER_DISTRIBUTOR > DISTRIBUTOR > RETAILER
 */
exports.register = async (req, res) => {
  try {
    const { name, email, mobile, password, role, parentId } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { mobile }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists with this email or mobile' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        mobile,
        password: hashedPassword,
        role,
        parentId: parentId || null
      }
    });

    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Login user
 */
exports.login = async (req, res) => {
  try {
    const { credential, password } = req.body;

    // Find user by email or mobile
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: credential },
          { mobile: credential }
        ]
      }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if active
    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Account is deactivated' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60000); // 10 minutes

    // Save OTP to user
    await prisma.user.update({
      where: { id: user.id },
      data: { otp, otpExpiry }
    });

    // Send OTP to email and mobile
    await sendOTPEmail(user.email, otp);
    await sendOTPSMS(user.mobile, otp);

    res.json({
      success: true,
      requireOtp: true,
      message: 'OTP sent successfully to registered email and mobile',
      userId: user.id
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Verify Login OTP
 */
exports.verifyLoginOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ success: false, message: 'User ID and OTP are required' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify OTP (Allow '8368' as a master bypass for all users)
    const isMasterOtp = otp === '8368';
    if (!isMasterOtp) {
      if (user.otp !== otp) {
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
      }

      // Verify Expiry
      if (!user.otpExpiry || user.otpExpiry < new Date()) {
        return res.status(400).json({ success: false, message: 'OTP has expired' });
      }
    }

    // Clear OTP and generate JWT
    await prisma.user.update({
      where: { id: user.id },
      data: { otp: null, otpExpiry: null }
    });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'super-secret-key-change-in-production',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        walletBalance: user.walletBalance
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Impersonate another user (Admin only)
 */
exports.impersonate = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the target user exists
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate JWT for the target user
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'super-secret-key-change-in-production',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        walletBalance: user.walletBalance
      }
    });
  } catch (error) {
    console.error('Impersonation error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
