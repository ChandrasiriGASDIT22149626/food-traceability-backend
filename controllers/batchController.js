const Batch = require('../models/Batch');
const QRCode = require('qrcode');

// @desc    Create new food batch (Farmer only)
exports.createBatch = async (req, res) => {
    try {
        const newBatch = new Batch({
            ...req.body,
            producer: req.user.id // From authMiddleware
        });
        const savedBatch = await newBatch.save();
        res.status(201).json(savedBatch);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc    Update batch status (Supplier/Retailer only)
exports.updateBatchStatus = async (req, res) => {
    try {
        const { status, location } = req.body;
        const batch = await Batch.findById(req.params.id);
        
        if (!batch) return res.status(404).json({ message: 'Batch not found' });

        // Update current status and push to history array
        batch.currentStatus = status;
        batch.trackingHistory.push({ status, location });
        
        await batch.save();
        res.json(batch);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc    Get batch details with QR Code (For Consumers)
exports.getBatchByNumber = async (req, res) => {
    try {
        const batch = await Batch.findOne({ batchNumber: req.params.batchNumber });
        if (!batch) return res.status(404).json({ message: 'Batch not found' });

        // Third-party API: Generate QR code for traceability link
        const qrCodeUrl = await QRCode.toDataURL(`https://foodtrace.live/batch/${batch.batchNumber}`);
        
        res.json({ batch, qrCodeUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Get full list of batches
exports.getAllBatches = async (req, res) => {
    try {
        const batches = await Batch.find().populate('producer', 'name');
        res.json(batches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};