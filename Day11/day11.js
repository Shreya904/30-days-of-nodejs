const express = require('express');
const authenticationMiddleware = require('./authMiddleware');
require('dotenv').config();

const app = express();

// Apply the authentication middleware to all routes or specific routes where authentication is required
app.use(authenticationMiddleware);

// Your routes go here...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
