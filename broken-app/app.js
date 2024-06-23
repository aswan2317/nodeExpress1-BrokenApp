const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const uRoutes = require('./routes/developers');  // Correct the path here
const db = require('./db');

app.use(express.json());
app.use('/users', uRoutes);

// 404 handler
app.use((req, res, next) => {
  const err = new ExpressError('Not Found', 404);
  return next(err);
});

// Generic error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: err.message,
  });
});

const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = { app, server };
