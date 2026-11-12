const r = require('express').Router(); const Product = require('../models/Product');
r.get('/', async (req, res) => {
  const { category, search } = req.query; const q = {};
  if (category && category !== 'All') q.category = category;
  if (search) q.name = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  res.json(await Product.find(q).sort({ category: 1, name: 1 }));
});
r.get('/:id', async (req, res) => {
  try { const p = await Product.findById(req.params.id); p ? res.json(p) : res.status(404).json({ message: 'Product not found' }); }
  catch { res.status(404).json({ message: 'Product not found' }); }
});
module.exports = r;
