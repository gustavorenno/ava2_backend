const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  secretary: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // ex: "14:30"
  address: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
