const express = require('express'); const cors = require('cors');
const seed = require('./seed');
const products = seed.map((p, i) => ({ ...p, _id: String(i + 1) }));
const users = [], orders = [];
const app = express(); app.use(cors()); app.use(express.json());

app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  res.json(products.filter(p =>
    (!category || category === 'All' || p.category === category) &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()))));
});
app.get('/api/products/:id', (req, res) => {
  const p = products.find(x => x._id === req.params.id);
  p ? res.json(p) : res.status(404).json({ message: 'Product not found' });
});
app.post('/api/users/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6) return res.status(400).json({ message: 'Enter name, email and a password of 6+ characters' });
  if (users.find(u => u.email === email.toLowerCase())) return res.status(400).json({ message: 'That email is already registered' });
  const u = { _id: String(users.length + 1), name, email: email.toLowerCase(), password };
  users.push(u); res.status(201).json({ _id: u._id, name, email: u.email, token: 'demo-' + u._id });
});
app.post('/api/users/login', (req, res) => {
  const u = users.find(x => x.email === (req.body.email || '').toLowerCase() && x.password === req.body.password);
  u ? res.json({ _id: u._id, name: u.name, email: u.email, token: 'demo-' + u._id }) : res.status(401).json({ message: 'Email or password is incorrect' });
});
app.post('/api/orders', (req, res) => {
  const { items = [], address, payment } = req.body;
  if (!items.length) return res.status(400).json({ message: 'Your cart is empty' });
  const sub = items.reduce((s, i) => s + (products.find(p => p._id === i.product)?.price || 0) * (i.qty || 1), 0);
  const o = { _id: 'demo' + Date.now(), items, address, payment, total: sub + (sub >= 499 ? 0 : 29) };
  orders.push(o); res.status(201).json(o);
});
app.listen(5000, () => console.log('DEMO API (no MongoDB) on port 5000'));