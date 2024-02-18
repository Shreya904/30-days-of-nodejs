const express = require('express');
const mongoose = require('mongoose');
const User = require('./user'); // Assuming User model is defined in a separate file

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nodeproblem', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Create Express application
const app = express();

// Define route to get all users
app.get('/users', async (req, res) => {
  try {
    // Retrieve all users from MongoDB
    const users = await User.find();
    res.json(users); // Send the array of user objects as JSON response
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' }); // Send an error response
  }
});

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
