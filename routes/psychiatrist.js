const express = require('express');
const Psychiatrist = require('../models/Psychiatrist');
const Hospital = require('../models/Hospitals'); 
const Patient = require('../models/Patient');

const router = express.Router();
//Add Psychistrists with id
router.post('/psychiatrists', async (req, res) => {
  const { name, hospitalId } = req.body;

  if (!name || !hospitalId) {
    return res.status(400).json({ message: 'Name and Hospital ID are required' });
  }

  try {
    
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    const newPsychiatrist = new Psychiatrist({
      name,
      hospital: hospitalId
    });
    
    const savedPsychiatrist = await newPsychiatrist.save();
    res.status(201).json(savedPsychiatrist);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Fetch all psychiatrists, their count along with IDs and patient details for a hospital
router.post('/hospital/psychiatrists', async (req, res) => {
  const { hospitalName } = req.body;

  if (!hospitalName) {
    return res.status(400).json({ message: 'Hospital name is required' });
  }

  try {
    const hospital = await Hospital.findOne({ name: hospitalName });
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    const psychiatrists = await Psychiatrist.find({ hospital: hospital._id }).lean();
    const psychiatristCount = psychiatrists.length;

    // Assuming the Patient model has a reference to Psychiatrist with field name `psychiatrist`
    const psychiatristDetails = await Promise.all(
      psychiatrists.map(async (psychiatrist) => {
        const patientCount = await Patient.countDocuments({ psychiatrist: psychiatrist._id });
        return {
          id: psychiatrist._id,
          name: psychiatrist.name,
          patientCount,
        };
      })
    );

    const totalPatientsCount = psychiatristDetails.reduce((sum, p) => sum + p.patientCount, 0);

    res.status(200).json({
      hospitalName: hospital.name,
      psychiatristCount,
      totalPatientsCount,
      psychiatristDetails,
    });
  } catch (error) {
    res.status(500).json({ message: 'Some Thing Went wrong', error });
  }
});

module.exports = router;
