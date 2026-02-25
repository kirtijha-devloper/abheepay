const User = require('../models/User');

/**
 * Checks if the logged-in user is a parent (direct or indirect) of the target user.
 * This is crucial for wallet funding and setting commission slabs.
 */
const rbacMiddleware = {
  // Check if req.user has a specific role or higher (e.g., ADMIN > SD > MD > DIST > RETAILER)
  // To keep it simple, we supply allowed roles.
  requireRole: (roles) => {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access Denied: Requires one of [${roles.join(', ')}]`
        });
      }
      next();
    };
  },

  /**
   * Enforces that the logged-in user can only modify a target ID (req.params.targetId or req.body.targetId)
   * if the target is in their direct downline.
   */
  requireDownlineAccess: async (req, res, next) => {
    try {
      const loggedInUserId = req.user._id.toString();
      const targetUserId = req.params.targetId || req.body.targetId;

      if (!targetUserId) {
        return res.status(400).json({ success: false, message: 'Target user ID is missing' });
      }

      // ADMIN has full authority over all
      if (req.user.role === 'ADMIN') {
        return next();
      }

      // If user is operating on themselves, allow
      if (loggedInUserId === targetUserId) {
        return next();
      }

      const targetUser = await User.findById(targetUserId);
      if (!targetUser) {
        return res.status(404).json({ success: false, message: 'Target user not found' });
      }

      // Traverse up to see if logged_in_user is an ancestor of target_user
      let currentParentId = targetUser.parentId;
      let isAncestor = false;
      const MaxDepth = 5; // Admin -> SD -> MD -> DIST -> RETAILER
      let currentDepth = 0;

      while (currentParentId && currentDepth < MaxDepth) {
        if (currentParentId.toString() === loggedInUserId) {
          isAncestor = true;
          break;
        }

        const parentUser = await User.findById(currentParentId).select('parentId');
        if (!parentUser) break;

        currentParentId = parentUser.parentId;
        currentDepth++;
      }

      if (!isAncestor) {
        return res.status(403).json({
          success: false,
          message: 'Access Denied: Target user is not in your downline'
        });
      }

      // Save target properties to request for later controllers to use
      req.targetUser = targetUser;
      next();

    } catch (error) {
      console.error('RBAC Error:', error);
      res.status(500).json({ success: false, message: 'Server error during RBAC verification' });
    }
  }
};

module.exports = rbacMiddleware;
