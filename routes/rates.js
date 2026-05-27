const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/mvr-inr', async (req, res) => {
  try {
    const response = await axios.get(
      'https://open.er-api.com/v6/latest/MVR'
    );
    const rate = response.data.rates.INR;
    res.json({ rate, from: 'MVR', to: 'INR' });
  } catch (err) {
    res.json({ rate: 4.82, from: 'MVR', to: 'INR' });
  }
});

module.exports = router;
