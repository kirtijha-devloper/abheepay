const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ==========================================
// PG Charges
// ==========================================

exports.getPGCharges = async (req, res) => {
  try {
    const charges = await prisma.pGCharge.findMany({
      orderBy: { createdAt: 'asc' }
    });
    res.json(charges);
  } catch (error) {
    console.error('Error fetching PG charges:', error);
    res.status(500).json({ error: 'Server error fetching PG charges' });
  }
};

exports.createPGCharge = async (req, res) => {
  try {
    const { method, network, cardType, subType, rate, commission } = req.body;
    const newCharge = await prisma.pGCharge.create({
      data: { method, network, cardType, subType, rate: parseFloat(rate), commission: parseFloat(commission) }
    });
    res.status(201).json(newCharge);
  } catch (error) {
    console.error('Error creating PG charge:', error);
    res.status(500).json({ error: 'Server error creating PG charge' });
  }
};

exports.updatePGCharge = async (req, res) => {
  try {
    const { id } = req.params;
    const { method, network, cardType, subType, rate, commission } = req.body;
    const updatedCharge = await prisma.pGCharge.update({
      where: { id },
      data: { method, network, cardType, subType, rate: parseFloat(rate), commission: parseFloat(commission) }
    });
    res.json(updatedCharge);
  } catch (error) {
    console.error('Error updating PG charge:', error);
    res.status(500).json({ error: 'Server error updating PG charge' });
  }
};

exports.deletePGCharge = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.pGCharge.delete({ where: { id } });
    res.json({ message: 'PG Charge deleted successfully' });
  } catch (error) {
    console.error('Error deleting PG charge:', error);
    res.status(500).json({ error: 'Server error deleting PG charge' });
  }
};

// ==========================================
// User PG Charge Overrides
// ==========================================

exports.getMyPGRates = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch global charges
    const globalCharges = await prisma.pGCharge.findMany({
      orderBy: { createdAt: 'asc' }
    });

    // Fetch user specific overrides
    const userOverrides = await prisma.userPGChargeOverride.findMany({
      where: { userId }
    });

    // Map global charges to either keep global rate or use override
    const activeRates = globalCharges.map(globalCharge => {
      const override = userOverrides.find(o =>
        o.method === globalCharge.method &&
        o.network === globalCharge.network &&
        o.cardType === globalCharge.cardType &&
        o.subType === globalCharge.subType
      );

      if (override) {
        return {
          ...globalCharge,
          rate: override.rate,
          commission: override.commission,
          isOverride: true
        };
      }
      return {
        ...globalCharge,
        isOverride: false
      };
    });

    res.json(activeRates);
  } catch (error) {
    console.error('Error fetching my PG rates:', error);
    res.status(500).json({ error: 'Server error fetching rates' });
  }
};
// ==========================================

exports.getUserPGChargeOverrides = async (req, res) => {
  try {
    const { role } = req.query;
    if (!role) {
      return res.status(400).json({ error: 'Role query parameter is required' });
    }

    const users = await prisma.user.findMany({
      where: { role: role },
      select: {
        id: true,
        name: true,
        pgChargeOverrides: true
      }
    });

    // We fetch global PG charges to use as a fallback if the user lacks a specific override
    const globalCharges = await prisma.pGCharge.findMany();

    const formattedData = users.map(user => {
      const row = {
        userId: user.id,
        userName: user.name,
      };

      // Create a map of the user's overrides for quick lookup
      const overrideMap = {};
      user.pgChargeOverrides.forEach(ov => {
        const key = `${ov.method}_${ov.network}_${ov.cardType}_${ov.subType}`;
        overrideMap[key] = ov;
      });

      // Map through all global charge types and assign the rate/commission 
      // utilizing the override if it exists, otherwise use global default.
      globalCharges.forEach(gc => {
        const key = `${gc.method}_${gc.network}_${gc.cardType}_${gc.subType}`;
        row[key] = overrideMap[key] ? overrideMap[key].rate : gc.rate;
        row[`${key}_commission`] = overrideMap[key] ? overrideMap[key].commission : gc.commission;
      });

      return row;
    });

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching user PG overrides:', error);
    res.status(500).json({ error: 'Server error fetching user PG overrides' });
  }
};

exports.saveUserPGChargeOverrides = async (req, res) => {
  try {
    const { userId, overrides } = req.body;
    // overrides should be an array of objects matching the UserPGChargeOverride schema
    // less the userId (method, network, cardType, subType, rate, commission)

    // We use a transaction to safely clear old overrides and write the new ones
    await prisma.$transaction(async (prisma) => {
      await prisma.userPGChargeOverride.deleteMany({
        where: { userId }
      });

      if (overrides && overrides.length > 0) {
        const dataToInsert = overrides.map(ov => ({
          userId,
          method: ov.method,
          network: ov.network,
          cardType: ov.cardType,
          subType: ov.subType,
          rate: parseFloat(ov.rate),
          commission: parseFloat(ov.commission)
        }));

        await prisma.userPGChargeOverride.createMany({
          data: dataToInsert
        });
      }
    });

    res.json({ message: 'User PG charge overrides saved successfully' });
  } catch (error) {
    console.error('Error saving user PG overrides:', error);
    res.status(500).json({ error: 'Server error saving user PG overrides' });
  }
};

// ==========================================
// Service Fees (Account Verification)
// ==========================================

exports.getServiceFees = async (req, res) => {
  try {
    const fees = await prisma.serviceFee.findMany({
      orderBy: { createdAt: 'asc' }
    });
    res.json(fees);
  } catch (error) {
    console.error('Error fetching service fees:', error);
    res.status(500).json({ error: 'Server error fetching service fees' });
  }
};

exports.createServiceFee = async (req, res) => {
  try {
    const { serviceKey, serviceName, feeAmount, isActive } = req.body;
    const newFee = await prisma.serviceFee.create({
      data: {
        serviceKey,
        serviceName,
        feeAmount: parseFloat(feeAmount),
        isActive: isActive !== undefined ? isActive : true
      }
    });
    res.status(201).json(newFee);
  } catch (error) {
    console.error('Error creating service fee:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Service fee for this key already exists' });
    }
    res.status(500).json({ error: 'Server error creating service fee' });
  }
};

exports.updateServiceFee = async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceKey, serviceName, feeAmount, isActive } = req.body;
    const updatedFee = await prisma.serviceFee.update({
      where: { id },
      data: {
        serviceKey,
        serviceName,
        feeAmount: parseFloat(feeAmount),
        isActive
      }
    });
    res.json(updatedFee);
  } catch (error) {
    console.error('Error updating service fee:', error);
    res.status(500).json({ error: 'Server error updating service fee' });
  }
};

exports.deleteServiceFee = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.serviceFee.delete({ where: { id } });
    res.json({ message: 'Service fee deleted successfully' });
  } catch (error) {
    console.error('Error deleting service fee:', error);
    res.status(500).json({ error: 'Server error deleting service fee' });
  }
};

// ==========================================
// Payout Charge Slabs
// ==========================================

exports.getPayoutChargeSlabs = async (req, res) => {
  try {
    const slabs = await prisma.payoutChargeSlab.findMany({
      orderBy: { minAmount: 'asc' }
    });
    res.json(slabs);
  } catch (error) {
    console.error('Error fetching payout slabs:', error);
    res.status(500).json({ error: 'Server error fetching payout slabs' });
  }
};

exports.createPayoutChargeSlab = async (req, res) => {
  try {
    const { minAmount, maxAmount, serviceCharge, serviceName, isActive } = req.body;
    const newSlab = await prisma.payoutChargeSlab.create({
      data: {
        minAmount: parseFloat(minAmount),
        maxAmount: parseFloat(maxAmount),
        serviceCharge: parseFloat(serviceCharge),
        serviceName: serviceName || 'Payout',
        isActive: isActive !== undefined ? isActive : true
      }
    });
    res.status(201).json(newSlab);
  } catch (error) {
    console.error('Error creating payout slab:', error);
    res.status(500).json({ error: 'Server error creating payout slab' });
  }
};

exports.updatePayoutChargeSlab = async (req, res) => {
  try {
    const { id } = req.params;
    const { minAmount, maxAmount, serviceCharge, serviceName, isActive } = req.body;
    const updatedSlab = await prisma.payoutChargeSlab.update({
      where: { id },
      data: {
        minAmount: parseFloat(minAmount),
        maxAmount: parseFloat(maxAmount),
        serviceCharge: parseFloat(serviceCharge),
        serviceName,
        isActive
      }
    });
    res.json(updatedSlab);
  } catch (error) {
    console.error('Error updating payout slab:', error);
    res.status(500).json({ error: 'Server error updating payout slab' });
  }
};

exports.deletePayoutChargeSlab = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.payoutChargeSlab.delete({ where: { id } });
    res.json({ message: 'Payout slab deleted successfully' });
  } catch (error) {
    console.error('Error deleting payout slab:', error);
    res.status(500).json({ error: 'Server error deleting payout slab' });
  }
};
