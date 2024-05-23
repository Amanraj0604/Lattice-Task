const express = require('express');
const Hospital = require('../models/Hospitals');
const router = express.Router();

router.post('/hospitals', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        const newHospital = new Hospital({ name });
        const savedHospital = await newHospital.save();
        res.status(201).json(savedHospital);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

module.exports = router;
