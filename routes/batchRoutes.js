const express = require('express');
const router = express.Router();
const { 
    createBatch, 
    updateBatchStatus, 
    getBatchByNumber, 
    getAllBatches 
} = require('../controllers/batchController');
const { protect, authorize } = require('../middleware/authMiddleware');

// 1. Only Farmers can create a new batch
router.post('/', protect, authorize('Farmer'), createBatch);

// 2. Suppliers/Retailers can update status (In Transit, Processed, etc.)
router.put('/:id', protect, authorize('Supplier', 'Retailer'), updateBatchStatus);

// 3. Consumers/Public can view details by batch number
router.get('/:batchNumber', getBatchByNumber);

// 4. Admin or general view of all batches
router.get('/', protect, getAllBatches);

module.exports = router;