const prisma = require('../config/db');

/**
 * Get current wallet balance of the logged-in user.
 */
exports.getBalance = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { walletBalance: true }
    });
    res.json({ success: true, balance: user.walletBalance });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Get transaction history for the logged-in user.
 * Supports filtering by type and status.
 */
exports.getTransactionHistory = async (req, res) => {
  try {
    const { type, status, service, startDate, endDate } = req.query;
    const where = { userId: req.user.id };

    if (type) where.type = type;
    if (status) where.status = status;
    if (service) where.service = service;

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        // Set end date to the end of that day
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    const transactions = await prisma.transaction.findMany({
      where,
      include: {
        user: {
          select: { name: true, email: true, mobile: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 200
    });

    res.json({ success: true, data: transactions });
  } catch (error) {
    console.error('Transaction history error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Get 7-day usage report for dashboard charts.
 * Aggregates successful transactions by date and service type.
 */
exports.getUsageReport = async (req, res) => {
  try {
    const { id, role } = req.user;

    // For simplicity, let's fetch the last 7 days of successful transactions
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const where = {
      status: 'SUCCESS',
      createdAt: { gte: sevenDaysAgo }
    };

    if (role !== 'ADMIN') {
      where.userId = id;
    }

    const transactions = await prisma.transaction.findMany({
      where,
      select: { amount: true, service: true, createdAt: true }
    });

    // Process data for Recharts format: { name: 'Date', PG: value, Payout: value, ... }
    const reportData = {};
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      reportData[dateStr] = { name: dateStr, PG: 0, Payout: 0, AEPS: 0, BBPS: 0, DMT: 0, Recharge: 0 };
    }

    transactions.forEach(tx => {
      const dateStr = tx.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (reportData[dateStr] && tx.service) {
        reportData[dateStr][tx.service] = (reportData[dateStr][tx.service] || 0) + tx.amount;
      }
    });

    res.json({ success: true, data: Object.values(reportData) });
  } catch (error) {
    console.error('Usage report error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
