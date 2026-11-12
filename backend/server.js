require('dotenv').config(); const express = require('express'); const cors = require('cors'); const mongoose = require('mongoose');
const Product = require('./models/Product'); const seed = require('./seed');
const app = express(); app.use(cors()); app.use(express.json());
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quickbasket').then(async () => {
  if (!(await Product.countDocuments())) { await Product.insertMany(seed); console.log('Seeded products'); }
  app.listen(process.env.PORT || 5000, () => console.log('API on port ' + (process.env.PORT || 5000)));
}).catch(e => { console.error('MongoDB connection failed:', e.message); process.exit(1); });
