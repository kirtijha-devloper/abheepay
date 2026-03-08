const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all active banks
exports.getBanks = async (req, res) => {
  try {
    const banks = await prisma.adminBankDetail.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(banks);
  } catch (error) {
    console.error('Error fetching bank details:', error);
    res.status(500).json({ error: 'Server error fetching bank details' });
  }
};

// Create a new bank
exports.createBank = async (req, res) => {
  try {
    const { bankName, ifsc, accountNumber, isActive } = req.body;

    // Basic validation
    if (!bankName || !ifsc || !accountNumber) {
      return res.status(400).json({ error: 'Bank Name, IFSC, and Account Number are required' });
    }

    const newBank = await prisma.adminBankDetail.create({
      data: {
        bankName,
        ifsc,
        accountNumber,
        isActive: isActive !== undefined ? isActive : true
      }
    });

    res.status(201).json({ message: 'Bank details added successfully', bank: newBank });
  } catch (error) {
    console.error('Error creating bank detail:', error);
    res.status(500).json({ error: 'Server error creating bank detail' });
  }
};

// Update an existing bank
exports.updateBank = async (req, res) => {
  try {
    const { id } = req.params;
    const { bankName, ifsc, accountNumber, isActive } = req.body;

    const updatedBank = await prisma.adminBankDetail.update({
      where: { id },
      data: { bankName, ifsc, accountNumber, isActive }
    });

    res.json({ message: 'Bank details updated successfully', bank: updatedBank });
  } catch (error) {
    console.error('Error updating bank detail:', error);
    res.status(500).json({ error: 'Server error updating bank detail' });
  }
};

// Delete a bank
exports.deleteBank = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.adminBankDetail.delete({ where: { id } });
    res.json({ message: 'Bank deleted successfully' });
  } catch (error) {
    console.error('Error deleting bank detail:', error);
    res.status(500).json({ error: 'Server error deleting bank detail' });
  }
};
