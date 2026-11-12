const mongoose = require('mongoose');
module.exports = mongoose.model('Product', new mongoose.Schema({
  name: { type: String, required: true }, category: String, price: Number, mrp: Number,
  unit: String, image: String, emoji: String, description: String, rating: { type: Number, default: 4.4 },
}));
