const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// ✅ Add the root route here
app.get('/', (req, res) => {
  res.json({
    message: "Number Classification API",
    endpoint: "/api/classify-number?number=YOUR_NUMBER"
  });
});

// Helper functions (isPrime, isPerfect, etc.) go here
// ...

// Existing API endpoint for /api/classify-number
app.get('/api/classify-number', async (req, res) => {
  // Your existing code
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});