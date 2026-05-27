const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = {}; // Simple storage

// Signup
router.post('/signup', async (req, res) => {
  const { name, phone, email, password } = req.body;
  if (users[phone]) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const hash = await bcrypt.hash(password, 10);
  users[phone] = { name, phone, email, password: hash };
  const token = jwt.sign({ phone }, process.env.JWT_SECRET || 'secret123', { expiresIn: '30d' });
  res.json({ token, user: { name, phone, email } });
});

// Login
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;
  const user = users[identifier] || Object.values(users).find(u => u.email === identifier);
  if (!user) return res.status(400).json({ error: 'User not found' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'Wrong password' });
  const token = jwt.sign({ phone: user.phone }, process.env.JWT_SECRET || 'secret123', { expiresIn: '30d' });
  res.json({ token, user: { name: user.name, phone: user.phone, email: user.email } });
});

module.exports = router;
