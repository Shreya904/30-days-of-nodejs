const express = require('express');
const app = express();

// Define the rate limit and the duration (in milliseconds)
const RATE_LIMIT = 5; // Limit requests to 5 per minute
const RATE_LIMIT_DURATION = 60000; // 1 minute

// Object to store request counts for each IP address
const requestCounts = {};

// Middleware function to enforce rate limit
function rateLimitMiddleware(req, res, next) {
  const clientIp = req.ip; // Get client's IP address

  // Initialize request count for this IP if it's not already set
  if (!requestCounts[clientIp]) {
    requestCounts[clientIp] = {
      count: 1,
      timestamp: Date.now()
    };
  } else {
    // If request count is already set, update it
    const currentTime = Date.now();
    const elapsedTime = currentTime - requestCounts[clientIp].timestamp;

    // Reset count if elapsed time exceeds the duration
    if (elapsedTime > RATE_LIMIT_DURATION) {
      requestCounts[clientIp] = {
        count: 1,
        timestamp: currentTime
      };
    } else {
      // If within the duration, increment the count
      requestCounts[clientIp].count++;
    }
  }

  // Check if request count exceeds the limit
  if (requestCounts[clientIp].count > RATE_LIMIT) {
    return res.status(429).send('Too Many Requests');
  }

  // If within the limit, proceed to the next middleware
  next();
}

app.use(rateLimitMiddleware);

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
