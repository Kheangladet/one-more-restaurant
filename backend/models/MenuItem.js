const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameKh: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ['starters', 'mains', 'seafood', 'soups', 'desserts', 'drinks'],
    required: true
  },
  image: { type: String, default: '' },
  isPopular: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
  spiceLevel: { type: Number, min: 0, max: 3, default: 0 },
  isVegetarian: { type: Boolean, default: false },
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
