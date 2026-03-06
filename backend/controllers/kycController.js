const prisma = require('../config/db');

/**
 * Submit KYC documents.
 * This assumes multer has already processed the files and attached them to req.files.
 */
exports.submitKYC = async (req, res) => {
  try {
    const userId = req.user.id;
    const { aadharNo, panNo } = req.body;

    // Check if a request already exists
    const existingRequest = await prisma.kYCRequest.findFirst({
      where: { userId, status: 'PENDING' }
    });

    if (existingRequest) {
      return res.status(400).json({ success: false, message: 'You already have a pending KYC request' });
    }

    // Prepare file paths (assuming storage locally for now as a fallback)
    const files = req.files || {};
    const aadharFront = files.aadharFront ? files.aadharFront[0].path : null;
    const aadharBack = files.aadharBack ? files.aadharBack[0].path : null;
    const panImage = files.panImage ? files.panImage[0].path : null;
    const bankDoc = files.bankDoc ? files.bankDoc[0].path : null;

    // Create KYC Request
    const kycRequest = await prisma.kYCRequest.create({
      data: {
        userId,
        aadharFront,
        aadharBack,
        panImage,
        bankDoc,
        status: 'PENDING'
      }
    });

    // Update user's basic info
    await prisma.user.update({
      where: { id: userId },
      data: { aadharNo, panNo, kycStatus: 'PENDING' }
    });

    res.status(201).json({ success: true, message: 'KYC submitted successfully', data: kycRequest });
  } catch (error) {
    console.error('KYC submission error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * List all pending KYC requests (Admin Only).
 */
exports.listPendingKYC = async (req, res) => {
  try {
    const requests = await prisma.kYCRequest.findMany({
      where: { status: 'PENDING' },
      include: {
        user: {
          select: { name: true, email: true, mobile: true, shopName: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: requests });
  } catch (error) {
    console.error('List KYC requests error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Approve or Reject a KYC request (Admin Only).
 */
exports.reviewKYC = async (req, res) => {
  try {
    const { requestId, status, remark } = req.body; // status: 'APPROVED' or 'REJECTED'

    const kycRequest = await prisma.kYCRequest.update({
      where: { id: requestId },
      data: { status, remark }
    });

    // Update user's kycStatus
    await prisma.user.update({
      where: { id: kycRequest.userId },
      data: { kycStatus: status }
    });

    res.json({ success: true, message: `KYC request ${status.toLowerCase()} successfully` });
  } catch (error) {
    console.error('Review KYC error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
