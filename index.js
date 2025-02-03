const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Enable CORS
app.use(cors());

// Parse URL-encoded bodies (for query params)
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Helper functions
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function isPerfect(num) {
  if (num <= 1) return false;
  let sum = 1;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return sum === num;
}

function isArmstrong(num) {
  const str = num.toString();
  const power = str.length;
  const sum = str.split('').reduce((acc, digit) => acc + Math.pow(parseInt(digit), power), 0);
  return sum === num;
}

function getDigitSum(num) {
  return num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
}

// API Endpoint
app.get('/api/classify-number', async (req, res) => {
  const { number } = req.query;

  // Input validation
  if (!number || isNaN(number)) {
    return res.status(400).json({
      number: number || "undefined",
      error: true
    });
  }

  const num = parseInt(number, 10);

  // Fetch fun fact from numbersapi.com
  let funFact = '';
  try {
    const response = await axios.get(`http://numbersapi.com/${num}/math`);
    funFact = response.data;
  } catch (error) {
    funFact = "No fun fact available.";
  }

  // Build response
  const result = {
    number: num,
    is_prime: isPrime(num),
    is_perfect: isPerfect(num),
    properties: [],
    digit_sum: getDigitSum(num),
    fun_fact: funFact
  };

  // Determine properties
  if (isArmstrong(num)) {
    result.properties.push("armstrong");
  }
  result.properties.push(num % 2 === 0 ? "even" : "odd");

  res.status(200).json(result);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});