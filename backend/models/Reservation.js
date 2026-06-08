const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true, min: 1, max: 50 },
  occasion: {
    type: String,
    enum: ['birthday', 'anniversary', 'business', 'casual', 'other'],
    default: 'casual'
  },
  specialRequests: { type: String },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  confirmationCode: { type: String }
}, { timestamps: true });

// Generate confirmation code before save
reservationSchema.pre('save', function(next) {
  if (!this.confirmationCode) {
    this.confirmationCode = 'OMR-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Reservation', reservationSchema);
