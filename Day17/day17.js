const mongoose = require('mongoose');

// Define the Mongoose schema for the User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true }
});

// Create the Mongoose model for the User schema
const User = mongoose.model('User', userSchema);

// Function to connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/nodeproblem', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Add a new user to the MongoDB database
async function addUserToDatabase(user) {
  try {
    await connectToDatabase(); // Connect to the database
    const newUser = new User(user); // Create a new User object
    await newUser.save(); // Save the user to the database
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
  } finally {
    mongoose.disconnect(); // Disconnect from the database
  }
}

// Test the function
addUserToDatabase({ username: 'john_doe', email: 'john@example.com' });
