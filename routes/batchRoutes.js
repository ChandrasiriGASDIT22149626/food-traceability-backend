const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const Batch = require('../models/Batch');
const { createBatch, getBatchHistory } = require('../controllers/batchController');
const { protect, authorize } = require('../middleware/authMiddleware');
// @desc    Create a new batch
// @route   POST /api/batches
// @access  Private (Farmer only)
router.post('/', protect, authorize('Farmer'), async (req, res) => {
  try {
    const newBatch = new Batch({
      ...req.body,
      producer: req.user.id // Associate the batch with the logged-in Farmer
    });
    const savedBatch = await newBatch.save();
    res.status(201).json(savedBatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});





router.get('/:batchNumber', getBatchHistory);


module.exports = router;