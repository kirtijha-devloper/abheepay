const prisma = require('../config/db');
const bcrypt = require('bcryptjs');

/**
 * Helper function to iteratively fetch all descendant IDs for a given user.
 */
async function getDownlineIds(startUserId) {
  let allChildIds = [];
  let currentLevelIds = [startUserId];

  // We loop until no more children are found
  while (currentLevelIds.length > 0) {
    // Fetch all users whose parentId is in our current level
    const children = await prisma.user.findMany({
      where: { parentId: { in: currentLevelIds } },
      select: { id: true }
    });

    const childIds = children.map(c => c.id);

    // Add them to our total pool
    allChildIds = allChildIds.concat(childIds);

    // Set the found children as the next level to search from
    currentLevelIds = childIds;
  }

  return allChildIds;
}

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
      // Fetch all descendants recursively
      const downlineIds = await getDownlineIds(loggedInUser.id);

      users = await prisma.user.findMany({
        where: { id: { in: downlineIds } },
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

    let baseQuery;

    if (loggedInUser.role === 'ADMIN') {
      baseQuery = { id: { not: loggedInUser.id } }; // Exclude the admin themselves
    } else {
      const downlineIds = await getDownlineIds(loggedInUser.id);
      baseQuery = { id: { in: downlineIds } };
    }

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

    // Strict Parent Hierarchy Check
    if (parentId) {
      const parent = await prisma.user.findUnique({ where: { id: parentId } });
      if (!parent) return res.status(400).json({ success: false, message: 'Invalid Parent ID' });

      const rolesHierarchy = ['ADMIN', 'SUPER_DISTRIBUTOR', 'MASTER_DISTRIBUTOR', 'DISTRIBUTOR', 'RETAILER'];
      const targetRoleIdx = rolesHierarchy.indexOf(role);
      const parentRoleIdx = rolesHierarchy.indexOf(parent.role);

      if (targetRoleIdx !== parentRoleIdx + 1) {
        return res.status(400).json({ success: false, message: `A ${role} must be placed under a ${rolesHierarchy[targetRoleIdx - 1]}` });
      }
    }

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
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Get all staff members (ADMIN and EMPLOYEE roles)
 * Only accessible by ADMIN
 */
exports.getStaff = async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Optional: Only allow ADMIN to view staff list
    if (loggedInUser.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Unauthorized. Admins only.' });
    }

    const staff = await prisma.user.findMany({
      where: {
        role: { in: ['ADMIN', 'EMPLOYEE'] }
      },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    res.json({ success: true, data: staff });
  } catch (error) {
    console.error('Get staff error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching staff' });
  }
};

/**
 * Get potential parents for a specific role
 */
exports.getPotentialParents = async (req, res) => {
  try {
    const { role } = req.query;
    const loggedInUser = req.user;
    const rolesHierarchy = ['ADMIN', 'SUPER_DISTRIBUTOR', 'MASTER_DISTRIBUTOR', 'DISTRIBUTOR', 'RETAILER'];

    const targetRoleIdx = rolesHierarchy.indexOf(role);
    if (targetRoleIdx <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid role for parent selection' });
    }

    const parentRole = rolesHierarchy[targetRoleIdx - 1];
    let query = { role: parentRole };

    // If not admin, only show parents in their own network
    if (loggedInUser.role !== 'ADMIN') {
      const downlineIds = await getDownlineIds(loggedInUser.id);
      query.id = { in: [...downlineIds, loggedInUser.id] };
    }

    const potentialParents = await prisma.user.findMany({
      where: query,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        mobile: true
      }
    });

    res.json({ success: true, data: potentialParents });
  } catch (error) {
    console.error('Get potential parents error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching parents' });
  }
};

/**
 * Update a user's profile and permissions (ADMIN only)
 */
exports.updateUser = async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (loggedInUser.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Unauthorized. Admins only.' });
    }

    const { id } = req.params;
    const { name, email, mobile, role, password, permissions } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (mobile) updateData.mobile = mobile;
    if (role) updateData.role = role;
    if (permissions) updateData.permissions = permissions;

    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, name: true, email: true, mobile: true, role: true, permissions: true }
    });

    res.json({ success: true, message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ success: false, message: 'Failed to update user' });
  }
};

/**
 * Get service access settings for a specific user
 */
exports.getUserServiceAccess = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, serviceAccess: true }
    });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Get service access error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Update service access settings for a specific user
 */
exports.updateUserServiceAccess = async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (loggedInUser.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Unauthorized. Admins only.' });
    }
    const { id } = req.params;
    const { serviceAccess } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { serviceAccess },
      select: { id: true, name: true, serviceAccess: true }
    });
    res.json({ success: true, message: 'Service access updated.', data: updatedUser });
  } catch (error) {
    console.error('Update user service access error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Get User Balance
 */
exports.getUserBalance = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: { walletBalance: true, eWalletBalance: true }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, ...user });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
