const mongoose = require('mongoose');

// User Schema defining the 5-level hierarchical structure
// ADMIN -> SUPER_DISTRIBUTOR -> MASTER_DISTRIBUTOR -> DISTRIBUTOR -> RETAILER
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Hierarchical RBAC
  role: {
    type: String,
    enum: ['ADMIN', 'SUPER_DISTRIBUTOR', 'MASTER_DISTRIBUTOR', 'DISTRIBUTOR', 'RETAILER'],
    required: true
  },

  // Self-referencing relationship for hierarchy
  // An Admin has no parentId. Everyone else has a parentId pointing to their direct upline.
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  // Wallet
  walletBalance: { type: Number, default: 0 },

  // KYC Reference
  kycStatus: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING'
  },
  kycRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KYC',
    default: null
  },

  // Service Activation Status (Matrix)
  services: {
    aeps: { type: Boolean, default: false },
    bbps: { type: Boolean, default: false },
    dmt: { type: Boolean, default: false },
    pg: { type: Boolean, default: false } // Only ADMIN can approve PG
  },

  // Geo-Fencing (Latitude & Longitude for compliance)
  location: {
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
    address: { type: String, default: '' }
  },

  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Calculate hierarchical path if needed for deep queries (Materialized Path pattern)
// Optional but extremely useful for "Find all downlines for an SD"
userSchema.index({ role: 1 });
userSchema.index({ parentId: 1 });

const User = mongoose.model('User', userSchema);
module.exports = User;
