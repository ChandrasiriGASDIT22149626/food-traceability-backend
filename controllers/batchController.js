const Batch = require('../models/Batch');

// @desc    Create new food batch (Farmer only)
exports.createBatch = async (req, res) => {
    try {
        const newBatch = new Batch({
            ...req.body,
            producer: req.user.id // Taken from the protect middleware
        });
        const savedBatch = await newBatch.save();
        res.status(201).json(savedBatch);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc    Get full traceability history for a batch
exports.getBatchHistory = async (req, res) => {
    try {
        const batch = await Batch.findOne({ batchNumber: req.params.batchNumber });
        if (!batch) return res.status(404).json({ message: "Batch not found" });
        res.json(batch);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};