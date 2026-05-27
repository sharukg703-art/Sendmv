const express = require('express');
const router = express.Router();

const transactions = [];

// Create transfer
router.post('/create', (req, res) => {
  const { recipientName, recipientPhone, mvrAmount, inrAmount } = req.body;
  const ref = 'TXN' + Date.now();
  const tx = {
    id: ref,
    recipientName,
    recipientPhone,
    mvrAmount,
    inrAmount,
    status: 'completed',
    createdAt: new Date()
  };
  transactions.push(tx);
  res.json({ 
    success: true, 
    reference: ref, 
    status: 'completed',
    message: 'Transfer successful!'
  });
});

// Get history
router.get('/history', (req, res) => {
  res.json(transactions.slice().reverse());
});

// Webhook
router.post('/webhook', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
