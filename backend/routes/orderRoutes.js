const r = require('express').Router(); const jwt = require('jsonwebtoken'); const Order = require('../models/Order'); const Product = require('../models/Product');
const auth = (req, res, next) => {
  try { req.userId = jwt.verify((req.headers.authorization || '').replace('Bearer ', ''), process.env.JWT_SECRET || 'dev').id; next(); }
  catch { res.status(401).json({ message: 'Please log in to continue' }); }
};
r.post('/', auth, async (req, res) => {
  const { items, address, payment } = req.body;
  if (!items?.length) return res.status(400).json({ message: 'Your cart is empty' });
  const docs = await Product.find({ _id: { $in: items.map(i => i.product) } });
  const lines = items.map(i => { const p = docs.find(d => String(d._id) === i.product); return p && { product: i.product, name: p.name, price: p.price, qty: Math.max(1, +i.qty || 1) }; }).filter(Boolean);
  const sub = lines.reduce((s, l) => s + l.price * l.qty, 0);
  res.status(201).json(await Order.create({ user: req.userId, items: lines, address, payment, total: sub + (sub >= 499 ? 0 : 29) }));
});
r.get('/mine', auth, async (req, res) => res.json(await Order.find({ user: req.userId }).sort({ createdAt: -1 })));
module.exports = r;
