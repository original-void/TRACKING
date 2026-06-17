const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let lastLocation = { lat: null, lng: null, time: null, acc: null };

// Phone sends location here
app.post('/update', (req, res) => {
  const { lat, lng, acc } = req.body;
  lastLocation = { lat, lng, acc, time: new Date().toISOString() };
  console.log('Location updated:', lastLocation);
  res.json({ status: 'ok' });
});

// Dashboard fetches last location here  
app.get('/last', (req, res) => {
  res.json(lastLocation);
});

// Redirect root to dashboard
app.get('/', (req, res) => {
  res.redirect('/dashboard.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`EZED NYANUGA TECH running on port ${PORT}`));
