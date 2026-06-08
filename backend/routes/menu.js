const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const { protect, adminOnly } = require('../middleware/auth');

// GET all menu items (public)
router.get('/', async (req, res) => {
  try {
    const { category, popular } = req.query;
    let query = { isAvailable: true };
    if (category) query.category = category;
    if (popular === 'true') query.isPopular = true;

    const items = await MenuItem.find(query).sort({ category: 1, name: 1 });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single menu item
router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create menu item (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT update menu item (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE menu item (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST seed default menu items
router.post('/seed/defaults', protect, adminOnly, async (req, res) => {
  try {
    await MenuItem.deleteMany({});
    const defaultItems = [
      { name: 'Prawn Amok Steamed in Coconut Shell', nameKh: 'អាម៉ុកបង្គា', description: 'Traditional Khmer fish amok made with fresh prawns, steamed in a coconut shell with kroeung paste and coconut milk.', price: 12, category: 'mains', isPopular: true, spiceLevel: 1 },
      { name: 'Lok Lak Beef', nameKh: 'លុកឡាក់', description: 'Classic Cambodian stir-fried beef cubes served on a bed of fresh lettuce with a Kampot pepper dipping sauce.', price: 11, category: 'mains', isPopular: true, spiceLevel: 1 },
      { name: 'Fish Cake', nameKh: 'នំដំឡូងត្រី', description: 'Freshly prepared Cambodian-style fish cakes fried golden, served with sweet chili sauce.', price: 7, category: 'starters', isPopular: true },
      { name: 'Sweet and Sour Pork Ribs', nameKh: 'ឆ្អឹងជ្រូកជូរផ្អែម', description: 'Tender pork ribs in a tangy sweet and sour glaze with seasonal vegetables.', price: 13, category: 'mains', spiceLevel: 0 },
      { name: 'Mango Sticky Rice', nameKh: 'បាយដំណើបម្ពោ', description: 'Sweet glutinous rice served warm with fresh ripe mango and coconut cream drizzle.', price: 5, category: 'desserts', isPopular: true, isVegetarian: true },
      { name: 'Shrimp Paste', nameKh: 'បាហ្ប', description: 'Fermented shrimp paste served with fresh vegetables and rice — a true Cambodian classic.', price: 6, category: 'starters', spiceLevel: 2 },
      { name: 'Sour Fish Soup', nameKh: 'សម្លរម្ជូរត្រីពោ', description: 'Traditional Cambodian sour broth with fresh river fish, lemongrass, and seasonal vegetables.', price: 9, category: 'soups', isPopular: true, spiceLevel: 1 },
      { name: 'Steamed Lemongrass Fish', nameKh: 'ត្រីតុកកែចំហុយក្រូចឆ្មា', description: 'Whole fish steamed with lemongrass, kaffir lime leaves, and fresh herbs.', price: 14, category: 'seafood', spiceLevel: 1 },
      { name: 'Sweet Rice Porridge', nameKh: 'បបរត្រាវ', description: 'Warm and comforting Khmer-style sweet rice porridge, a beloved traditional dessert.', price: 4, category: 'desserts', isVegetarian: true },
      { name: 'Fresh Coconut Water', nameKh: 'ទឹកដូង', description: 'Refreshing young coconut water served straight from the coconut.', price: 3, category: 'drinks', isVegetarian: true },
      { name: 'Cambodian Iced Coffee', nameKh: 'កាហ្វេទឹកកក', description: 'Strong Cambodian coffee sweetened with condensed milk over crushed ice.', price: 2.5, category: 'drinks', isVegetarian: true },
      { name: 'Spring Rolls', nameKh: 'រំចឹក', description: 'Crispy fried spring rolls filled with vegetables and glass noodles, served with sweet chili sauce.', price: 6, category: 'starters', isVegetarian: true }
    ];
    const items = await MenuItem.insertMany(defaultItems);
    res.json({ success: true, message: `${items.length} menu items seeded`, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
