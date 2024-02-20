const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  // Other fields if needed
}, { collection: 'user' }); // Specify the collection name

// Define User model
const User = mongoose.model('User', userSchema);

module.exports = User;
