const mongoose = require('mongoose');

const BatchSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  batchNumber: { type: String, required: true, unique: true },
  origin: { type: String, required: true },
  producer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  harvestDate: { type: Date, default: Date.now },
  currentStatus: { 
    type: String, 
    enum: ['Harvested', 'In Transit', 'Processed', 'Retail', 'Consumer'],
    default: 'Harvested'
  },
  // Stores every location and status change
  trackingHistory: [{
    location: String,
    status: String,
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Batch', BatchSchema);