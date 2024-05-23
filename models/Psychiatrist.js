const mongoose = require('mongoose');

const PsychiatristSchema = new mongoose.Schema({
  name: {
     type: String,
     required: true 
    },
  hospital: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Hospital', 
     required: true }
});

module.exports = mongoose.model('Psychiatrist', PsychiatristSchema);