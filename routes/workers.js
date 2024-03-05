const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    try {
        // Extract worker data from request body
        const { firstName, lastName, email, location, street } = req.body;

        // Create a new worker entry in the database
        const newWorker = new User({ firstName, lastName, email, location, street });
        await newWorker.save();

        res.status(201).json({ message: 'Worker entry added successfully', worker: newWorker });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add worker entry' });
    }
});

// Add endpoint to edit an existing worker entry by ID
router.put('/:id', async (req, res) => {
    try {
        // Extract worker ID from request parameters
        const workerId = req.params.id;

        // Extract updated worker data from request body
        const { firstName, lastName, email, location, street } = req.body;

        // Find the existing worker entry by ID and update it with the new data
        const updatedWorker = await User.findByIdAndUpdate(workerId, { firstName, lastName, email, location, street }, { new: true });

        if (updatedWorker) {
            res.json({ message: 'Worker entry updated successfully', worker: updatedWorker });
        } else {
            res.status(404).json({ error: 'Worker not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update worker entry' });
    }
});

module.exports = router;
