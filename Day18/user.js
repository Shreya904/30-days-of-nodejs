// User.js

const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  // Add more fields as needed
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
