const express = require('express');
const path = require('path');

/**
 * Express application serving static files from the "public" directory
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function staticFileServer(req, res) {
  const app = express();

 
  app.use(express.static(path.join(__dirname, 'public')));

  // Ensure accessing the root ("/") returns the "index.html" file
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Test cases
staticFileServer();
