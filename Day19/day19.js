
const express = require('express');
const mongoose = require('mongoose');
const User = require('./user'); // Import the User model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nodeproblem', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Express application
const app = express();

// Define addUserWithValidation function
async function addUserWithValidation(user) {
  try {
    // Create a new user instance using the provided user object
    const newUser = new User(user);
    // Attempt to save the user to the database
    await newUser.save();
    console.log('User added successfully');
  } catch (error) {
    // If validation fails or there's another error, log the error message
    console.error('Error adding user:', error.message);
  }
}

// Example usage of addUserWithValidation
addUserWithValidation({ username: 'john_doe', email: 'invalid-email' });

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
