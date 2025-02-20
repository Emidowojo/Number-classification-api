const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: "Number Classification API",
    endpoint: "/api/classify-number?number=YOUR_NUMBER"
  });
});

// Optimized Prime Check
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i <= Math.sqrt(num); i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

// Perfect Number Check
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

// Armstrong Number Check
function isArmstrong(num) {
  const str = Math.abs(num).toString();
  const power = str.length;
  const sum = str.split('').reduce((acc, digit) => acc + Math.pow(parseInt(digit), power), 0);
  return sum === Math.abs(num);
}

// Digit Sum Function
function getDigitSum(num) {
  const absNum = Math.abs(Number(num));
  return absNum
    .toString()
    .split('')
    .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
}

// API Endpoint with Timeout and Range Check
app.get('/api/classify-number', async (req, res) => {
  try {
    const { number } = req.query;

    // Input validation (reject non-integers)
    if (!number || isNaN(number) || !Number.isInteger(Number(number))) {
      return res.status(400).json({ 
        number: number || "undefined", 
        error: "Invalid input: must be an integer" 
      });
    }

    const num = parseInt(number, 10);

    // Range validation
    if (Math.abs(num) > 1000000) {
      return res.status(400).json({
        number: num,
        error: "Number must be between -1,000,000 and 1,000,000."
      });
    }

    // Fetch fun fact with timeout
    let funFact = "No fun fact available.";
    try {
      const response = await axios.get(`http://numbersapi.com/${Math.abs(num)}/math`, {
        timeout: 5000 // 5-second timeout
      });
      funFact = response.data;
    } catch (error) {
      console.error("Fun fact API error:", error.message);
      funFact = "No fun fact available (API timeout).";
    }

    // Build response
    const result = {
      number: num,
      is_prime: isPrime(Math.abs(num)),
      is_perfect: isPerfect(Math.abs(num)),
      properties: [],
      digit_sum: Number(getDigitSum(num)), // Explicit conversion
      fun_fact: funFact
    };

    // Determine properties
    if (isArmstrong(Math.abs(num))) {
      result.properties.push("armstrong");
    }
    result.properties.push(num % 2 === 0 ? "even" : "odd");

    res.status(200).json(result);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});