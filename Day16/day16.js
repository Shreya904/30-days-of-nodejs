const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = express();
const PORT = 3000;

// Define MongoDB connection function
function connectToMongoDB() {
  // MongoDB connection string
  const connectionString = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string

  // Connect to MongoDB
  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

  // Get the default connection
  const db = mongoose.connection;

  // Event handling for connection success
  db.once('open', () => {
    console.log('Connected to MongoDB successfully');
  });

  // Event handling for connection error
  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
}

// Connect to MongoDB
connectToMongoDB();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
