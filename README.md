# Number Classification API

A REST API that classifies numbers into prime, perfect, Armstrong, and other properties, with fun facts from [NumbersAPI](http://numbersapi.com/).

## Features
- Check if a number is **prime**, **perfect**, or **Armstrong**.
- Calculate the sum of a number’s digits.
- Fetch fun facts from [NumbersAPI](http://numbersapi.com/).

## Technologies Used
- Node.js + Express
- Heroku (Deployment)
- Axios (HTTP client)

## Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/Emidowojo/Number-classification-api.git
   cd Number-classification-api
2. Install dependencies
   ```bash
   npm install
3. Start the server locally
   ```bash
   node index.js
## API Endpoint

GET `/api/classify-number`

### Example Request
```bash
curl "https://number-classification-api-0c5f4d8e14f8.herokuapp.com/api/classify-number?number=371"
```
### Example Response
```bash
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```
## Deployment
Deployed to Heroku
### Live URL: 
https://number-classification-api-0c5f4d8e14f8.herokuapp.com/api/classify-number?number=371




