const express = require('express');
const { body, validationResult } = require('express-validator');
const Patient = require('../models/Patient');
const Psychiatrist = require('../models/Psychiatrist');
const router = express.Router();

// Define the POST route for creating a new patient
router.post('/patients', [
    body('name').notEmpty().withMessage('Name is required'),
    body('address').isLength({ min: 10 }).withMessage('Address should be at least 10 characters'),
    body('email').isEmail().withMessage('Email should be a valid email address'),
    body('phone').isLength({ min: 10 }).withMessage('Phone number should be at least 10 characters including country code'),
    body('password').isLength({ min: 8, max: 15 }).withMessage('Password must be between 8 and 15 characters')
                   .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
                   .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
                   .matches(/\d/).withMessage('Password must contain at least one number'),
    body('photo').notEmpty().withMessage('Photo is required'),
    body('psychiatrist').notEmpty().withMessage('Psychiatrist ID is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, address, email, phone, password, photo, psychiatrist } = req.body;

       
        const psychiatristExists = await Psychiatrist.findById(psychiatrist);
        if (!psychiatristExists) {
            return res.status(400).json({ message: 'Psychiatrist ID not found' });
        }

        const newPatient = new Patient({
            name,
            address,
            email,
            phone,
            password,
            photo,
            psychiatrist
        });

        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
