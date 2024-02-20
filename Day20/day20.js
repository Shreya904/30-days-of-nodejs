const express = require('express');
const mongoose = require('mongoose');
const User = require('./user'); 
async function averageAgeOfUsers(req, res) {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: '$age' }
        }
      }
    ]);
    if (result.length > 0) {
      res.json({ averageAge: result[0].averageAge });
    } else {
      res.status(404).json({ error: 'No users found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const app = express();
mongoose.connect('mongodb://localhost:27017/problem2', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.get('/average-age', averageAgeOfUsers);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });
``
