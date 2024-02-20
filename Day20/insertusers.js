const mongoose = require('mongoose');
const User = require('./user'); // Assuming you've defined the User model
//it has some problem....
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/problem2', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Insert user documents
    try {
      await User.insertMany([
        { name: "John Doe", age: 30, email: "john@example.com" },
        { name: "Jane Smith", age: 25, email: "jane@example.com" },
        // Add more user documents as needed
      ]);
      console.log('User documents inserted successfully');
    } catch (err) {
      console.error('Error inserting user documents:', err.message);
    } finally {
      // Close the connection after inserting documents
      mongoose.connection.close();
    }
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });
