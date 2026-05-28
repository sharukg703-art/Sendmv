const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ Error:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/transfer', require('./routes/transfer'));
app.use('/api/rates', require('./routes/rates'));

app.get('/', (req, res) => {
  res.json({ status: '✅ SendMV Backend Running!', version: '1.0.0' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server on port ${PORT}`);
});
