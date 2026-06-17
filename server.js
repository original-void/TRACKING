const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public')); // serves html files

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
