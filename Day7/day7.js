function requestLoggerMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    console.log(`${timestamp} - ${method} request received`);
    next();
  }
  const express = require('express');
  const app = express();
  
  // Using the request logger middleware
  app.use(requestLoggerMiddleware);
  
  // Other middleware and routes...
  
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
    