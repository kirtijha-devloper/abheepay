const prisma = require('../config/db');

/**
 * Raise a new fund request
 */
exports.raiseFundRequest = async (req, res) => {
  try {
    const { amount, mode, utr, companyAccount, remark } = req.body;
    const userId = req.user.id;

    // Check if UTR already exists
    const existingRequest = await prisma.fundRequest.findUnique({
      where: { utr }
    });

    if (existingRequest) {
      return res.status(400).json({ success: false, message: 'UTR already exists' });
    }

    const proofImage = req.file ? `/uploads/proofs/${req.file.filename}` : null;

    const fundRequest = await prisma.fundRequest.create({
      data: {
        amount: parseFloat(amount),
        mode,
        utr,
        companyAccount,
        proofImage,
        remark,
        userId,
        status: 'PENDING'
      }
    });

    res.status(201).json({ success: true, data: fundRequest });
  } catch (error) {
    console.error('Raise fund request error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Get fund requests with filters
 */
exports.getFundRequests = async (req, res) => {
  try {
    const { status, search, fromDate, toDate, type = 'received', page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (status === 'PROCESSED') {
      where.status = { in: ['APPROVED', 'REJECTED'] };
    } else if (status) {
      where.status = status;
    }

    // Date range filter
    if (fromDate || toDate) {
      where.createdAt = {};
      if (fromDate) where.createdAt.gte = new Date(fromDate);
      if (toDate) {
        const endDay = new Date(toDate);
        endDay.setHours(23, 59, 59, 999);
        where.createdAt.lte = endDay;
      }
    }

    // Hierarchical Sorting Logic
    if (req.user.role === 'ADMIN') {
      // Admin sees everything
    } else if (type === 'received') {
      // Superiors seeing requests from their DIRECT downlines
      where.user = { parentId: req.user.id };
    } else {
      // User seeing their own raised requests
      where.userId = req.user.id;
    }

    if (search) {
      where.OR = [
        { utr: { contains: search, mode: 'insensitive' } },
        { companyAccount: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { mobile: { contains: search, mode: 'insensitive' } } }
      ];
    }

    // Hierarchy logic already defines visibility above

    const [requests, total] = await Promise.all([
      prisma.fundRequest.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              mobile: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.fundRequest.count({ where })
    ]);

    res.json({
      success: true,
      data: requests,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get fund requests error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Update fund request status (Admin Only)
 */
exports.updateFundRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remark } = req.body;

    const request = await prisma.fundRequest.findUnique({
      where: { id },
      include: { user: true }
    });

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    if (request.status !== 'PENDING') {
      return res.status(400).json({ success: false, message: 'Request already processed' });
    }

    // Security: Non-admins can only approve their own downline's requests
    if (req.user.role !== 'ADMIN' && request.user.parentId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'You can only approve requests from your own downline' });
    }

    // Start transaction to update status and wallet balance if approved
    const result = await prisma.$transaction(async (tx) => {
      // 1. If approved, check and deduct superior's balance (including Admin)
      if (status === 'APPROVED') {
        const superior = await tx.user.findUnique({ where: { id: req.user.id } });
        if (superior.walletBalance < request.amount) {
          throw new Error('Insufficient balance in your wallet to approve this request');
        }

        // Deduct from superior
        await tx.user.update({
          where: { id: req.user.id },
          data: { walletBalance: { decrement: request.amount } }
        });

        // Create debit transaction for superior
        await tx.transaction.create({
          data: {
            userId: req.user.id,
            amount: request.amount,
            type: 'DEBIT',
            status: 'SUCCESS',
            service: 'FUND_TRANSFER',
            description: `Fund provided to ${request.user.name} (${request.utr})`
          }
        });
      }

      // 2. Update request status
      const updatedRequest = await tx.fundRequest.update({
        where: { id },
        data: { status, remark: remark || request.remark }
      });

      // 3. If approved, credit to the requester
      if (status === 'APPROVED') {
        await tx.user.update({
          where: { id: request.userId },
          data: { walletBalance: { increment: request.amount } }
        });

        await tx.transaction.create({
          data: {
            userId: request.userId,
            amount: request.amount,
            type: 'CREDIT',
            status: 'SUCCESS',
            service: 'FUND_REQUEST',
            description: `Fund request approved by ${req.user.name} (${request.utr})`
          }
        });
      }

      return updatedRequest;
    });

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Update fund request error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
