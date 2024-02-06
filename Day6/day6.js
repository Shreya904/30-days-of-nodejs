/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function greetHandler(req, res) {
  const { name } = req.query;

  // Check if name parameter is provided
  if (name) {
    res.send(`Hello, ${name}!`);
  } else {
    res.send("Hello, Guest!");
  }
}

// Example of how to use this handler in your Express app:
const express = require('express');
const app = express();

// Define the route with the greetHandler function
app.get('/greet', greetHandler);