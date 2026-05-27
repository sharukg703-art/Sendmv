const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ Error:', err));

// Auth routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transfer', require('./routes/transfer'));
app.use('/api/rates', require('./routes/rates'));

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: '✅ SendMV Backend Running!',
    version: '1.0.0'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
