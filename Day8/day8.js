const express = require('express');
const app = express();

// Express route to handle requests with a positive integer parameter
function positiveIntegerHandler(req, res, next) {
  const number = parseInt(req.query.number);
  if (Number.isInteger(number) && number > 0) {
    res.status(200).send("Success: The number is a positive integer.");
  } else {
    next(new Error('The "number" parameter must be a positive integer.'));
  }
}
function errorHandler(err, req, res, next) {
  if (err.message === 'The "number" parameter must be a positive integer.') {
    res.status(400).send('Error: The "number" parameter must be a positive integer.');
  } else {
    // Pass the error to the default Express error handler
    next(err);
  }
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/positive', positiveIntegerHandler);
app.use(errorHandler);
// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
