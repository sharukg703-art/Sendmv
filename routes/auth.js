const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = {};

router.post('/signup', async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    if (users[phone]) return res.json({ error: 'User already exists' });
    const hash = await bcrypt.hash(password, 10);
    users[phone] = { name, phone, email, password: hash };
    const token = jwt.sign({ phone }, process.env.JWT_SECRET || 'sendmv123', { expiresIn: '30d' });
    res.json({ token, user: { name, phone, email } });
  } catch(e) { res.json({ error: e.message }); }
});

router.post('/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  if (otp === '123456') {
    const user = users[phone] || { name: 'User', phone, email: '' };
    const token = jwt.sign({ phone }, process.env.JWT_SECRET || 'sendmv123', { expiresIn: '30d' });
    res.json({ token, user });
  } else {
    res.json({ error: 'Invalid OTP' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = users[identifier] || Object.values(users).find(u => u.email === identifier);
    if (!user) return res.json({ error: 'User not found' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ error: 'Wrong password' });
    const token = jwt.sign({ phone: user.phone }, process.env.JWT_SECRET || 'sendmv123', { expiresIn: '30d' });
    res.json({ token, user: { name: user.name, phone: user.phone, email: user.email } });
  } catch(e) { res.json({ error: e.message }); }
});

module.exports = router;
