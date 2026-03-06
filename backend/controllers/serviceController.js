const prisma = require('../config/db');

/**
 * Mock Transaction Processing (AEPS, DMT, etc.)
 */
exports.processTransaction = async (req, res) => {
  try {
    const { amount, service, type, userId } = req.body; // type: 'DEBIT' or 'CREDIT'
    const targetUserId = userId || req.user.id;

    // 1. Validate balance for DEBIT
    if (type === 'DEBIT') {
      const user = await prisma.user.findUnique({ where: { id: targetUserId } });
      if (user.walletBalance < amount) {
        return res.status(400).json({ success: false, message: 'Insufficient wallet balance' });
      }
    }

    // 2. Start Transaction (Prisma Transaction)
    const result = await prisma.$transaction(async (tx) => {
      // Create the main transaction record
      const mainTx = await tx.transaction.create({
        data: {
          amount,
          type,
          service,
          status: 'SUCCESS',
          userId: targetUserId,
          description: `${service} transaction processed`
        }
      });

      // Update User Balance
      const balanceChange = type === 'CREDIT' ? amount : -amount;
      const updatedUser = await tx.user.update({
        where: { id: targetUserId },
        data: { walletBalance: { increment: balanceChange } }
      });

      // 3. Commission Distribution (Simplified Mock Logic)
      // Logic: Retailer gets 1%, Parent gets 0.5%, Parent's Parent gets 0.2%
      if (service !== 'ADD_FUND') {
        let currentParentId = updatedUser.parentId;
        let commAmount = amount * 0.01; // Retailer commission

        // Credit Retailer Commission
        await tx.transaction.create({
          data: {
            amount: commAmount,
            type: 'CREDIT',
            service: 'COMMISSION',
            status: 'SUCCESS',
            userId: targetUserId,
            description: `Commission for ${service}`
          }
        });
        await tx.user.update({
          where: { id: targetUserId },
          data: { walletBalance: { increment: commAmount } }
        });

        // Distribute to Parents
        let depth = 0;
        while (currentParentId && depth < 3) {
          const parentComm = amount * (depth === 0 ? 0.005 : 0.002);

          await tx.transaction.create({
            data: {
              amount: parentComm,
              type: 'CREDIT',
              service: 'COMMISSION',
              status: 'SUCCESS',
              userId: currentParentId,
              description: `Downline commission from ${updatedUser.name} for ${service}`
            }
          });

          await tx.user.update({
            where: { id: currentParentId },
            data: { walletBalance: { increment: parentComm } }
          });

          const parent = await tx.user.findUnique({ where: { id: currentParentId }, select: { parentId: true } });
          currentParentId = parent ? parent.parentId : null;
          depth++;
        }
      }

      return mainTx;
    });

    res.json({ success: true, message: 'Transaction processed successfully', data: result });
  } catch (error) {
    console.error('Process transaction error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Get Commission Slabs (Static for now)
 */
exports.getCommissionPlans = async (req, res) => {
  try {
    const plans = await prisma.commissionPlan.findMany({ where: { isActive: true } });
    res.json({ success: true, data: plans });
  } catch (error) {
    console.error('Get commission plans error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
