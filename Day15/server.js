const express = require('express');
const app = express();
const loggingMiddleware = require('./loggingMiddleware');

// Use the logging middleware for all routes
app.use(loggingMiddleware);

// Define routes
app.get('/', (req, res) => {
  res.send('GET request received');
});

app.post('/', (req, res) => {
  res.send('POST request received');
});

// Start the server
const PORT = 3001; // Change the port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
