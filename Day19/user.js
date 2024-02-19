

const mongoose = require('mongoose');

// Define the schema for the User model with validation
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Regular expression for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  // Add more fields as needed
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
