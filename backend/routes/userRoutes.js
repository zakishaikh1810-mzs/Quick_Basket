const r = require('express').Router(); const bcrypt = require('bcryptjs'); const jwt = require('jsonwebtoken'); const User = require('../models/User');
const sign = u => ({ _id: u._id, name: u.name, email: u.email, token: jwt.sign({ id: u._id }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' }) });
r.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6) return res.status(400).json({ message: 'Enter name, email and a password of 6+ characters' });
  if (await User.findOne({ email: email.toLowerCase() })) return res.status(400).json({ message: 'That email is already registered' });
  res.status(201).json(sign(await User.create({ name, email, password: await bcrypt.hash(password, 10) })));
});
r.post('/login', async (req, res) => {
  const u = await User.findOne({ email: (req.body.email || '').toLowerCase() });
  if (!u || !(await bcrypt.compare(req.body.password || '', u.password))) return res.status(401).json({ message: 'Email or password is incorrect' });
  res.json(sign(u));
});
module.exports = r;
