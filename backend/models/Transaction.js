const mongoose = require('mongoose');

// Transaction Schema for Wallet Funding, Commission distribution, and Ledger
const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  // The user initiating or receiving the core transaction
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  type: {
    type: String,
    enum: ['CREDIT', 'DEBIT', 'COMMISSION', 'FEE'],
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  serviceType: {
    type: String,
    enum: ['AEPS', 'DMT', 'BBPS', 'WALLET_FUNDING', 'PG'],
    required: true
  },

  status: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'],
    default: 'PENDING'
  },

  // Multi-level commission splits logged within the main transaction
  // e.g., if Retailer does AEPS, commission splits go to Dist, MD, SD
  commissionSplits: [
    {
      beneficiaryId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: String },
      amount: { type: Number },
      status: { type: String, enum: ['PENDING', 'CREDITED'], default: 'PENDING' }
    }
  ],

  description: { type: String },

  // Geo-fencing validation proof at the time of transaction
  geoLog: {
    lat: { type: Number },
    lng: { type: Number },
    distanceFromBase: { type: Number } // Must be <= 2km for certain services
  },

  createdAt: { type: Date, default: Date.now }
});

transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ transactionId: 1 });

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
