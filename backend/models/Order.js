const mongoose = require('mongoose');
module.exports = mongoose.model('Order', new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ product: String, name: String, price: Number, qty: Number }],
  address: { name: String, phone: String, line: String, city: String, pin: String },
  payment: String, total: Number, status: { type: String, default: 'Placed' },
}, { timestamps: true }));
