const prisma = require('../config/db');
const bcrypt = require('bcryptjs');

/**
 * List all users in the downline of the logged-in user.
 * ADMIN sees everyone.
 * Others see only their direct and indirect downline.
 */
exports.listUsers = async (req, res) => {
  try {
    const loggedInUser = req.user;
    let users = [];

    if (loggedInUser.role === 'ADMIN') {
      users = await prisma.user.findMany({
        where: { id: { not: loggedInUser.id } },
        select: {
          id: true,
          name: true,
          email: true,
          mobile: true,
          role: true,
          shopName: true,
          walletBalance: true,
          kycStatus: true,
          isActive: true,
          createdAt: true,
          parent: {
            select: {
              id: true,
              name: true,
              role: true
            }
          }
        }
      });
    } else {
      // Fetch all descendants recursively (or just direct for simplicity if preferred)
      // For now, let's fetch matching parentId
      users = await prisma.user.findMany({
        where: { parentId: loggedInUser.id },
        select: {
          id: true,
          name: true,
          email: true,
          mobile: true,
          role: true,
          shopName: true,
          walletBalance: true,
          kycStatus: true,
          isActive: true,
          createdAt: true,
          parent: {
            select: {
              id: true,
              name: true,
              role: true
            }
          }
        }
      });
    }

    res.json({ success: true, data: users });
  } catch (error) {
    console.error('List users error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Get dashboard stats for the logged-in user's network.
 */
exports.getUserStats = async (req, res) => {
  try {
    const loggedInUser = req.user;
    let totalUsers, activeUsers, deactivatedUsers;

    const baseQuery = loggedInUser.role === 'ADMIN' ? {} : { parentId: loggedInUser.id };

    totalUsers = await prisma.user.count({ where: baseQuery });
    activeUsers = await prisma.user.count({ where: { ...baseQuery, isActive: true } });
    deactivatedUsers = await prisma.user.count({ where: { ...baseQuery, isActive: false } });

    // Role-specific counts
    const sdCount = await prisma.user.count({ where: { ...baseQuery, role: 'SUPER_DISTRIBUTOR' } });
    const mdCount = await prisma.user.count({ where: { ...baseQuery, role: 'MASTER_DISTRIBUTOR' } });
    const distCount = await prisma.user.count({ where: { ...baseQuery, role: 'DISTRIBUTOR' } });
    const retailerCount = await prisma.user.count({ where: { ...baseQuery, role: 'RETAILER' } });

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        deactivatedUsers,
        roles: {
          SUPER_DISTRIBUTOR: sdCount,
          MASTER_DISTRIBUTOR: mdCount,
          DISTRIBUTOR: distCount,
          RETAILER: retailerCount
        }
      }
    });
  } catch (error) {
    console.error('User stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Add a new user to the system.
 */
exports.addUser = async (req, res) => {
  try {
    const {
      role, name, shopName, mobile, email,
      address, city, state, pincode,
      aadharNo, panNo, bankName, accountNo, ifscCode,
      password, parentId
    } = req.body;

    const loggedInUser = req.user;

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { mobile }] }
    });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Role Validation (Simplified: can only create a role lower than self, unless ADMIN)
    const rolesOrder = ['ADMIN', 'SUPER_DISTRIBUTOR', 'MASTER_DISTRIBUTOR', 'DISTRIBUTOR', 'RETAILER'];
    if (loggedInUser.role !== 'ADMIN') {
      const parentRoleIdx = rolesOrder.indexOf(loggedInUser.role);
      const childRoleIdx = rolesOrder.indexOf(role);
      if (childRoleIdx <= parentRoleIdx) {
        return res.status(403).json({ success: false, message: 'Cannot create a user with same or higher role' });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        role,
        name,
        shopName,
        mobile,
        email,
        password: hashedPassword,
        city,
        state,
        pincode,
        aadharNo,
        panNo,
        bankName,
        accountNo,
        ifscCode,
        parentId: parentId || loggedInUser.id,
      }
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { id: newUser.id, name: newUser.name, role: newUser.role }
    });
  } catch (error) {
    console.error('Add user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
