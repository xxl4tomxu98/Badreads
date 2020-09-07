// external requires
const express = require('express');
const morgan = require("morgan");
const cors = require("cors");

// internal requires
const { environment } = require('./config');
const landingRouter = require('./routes/landing')

const app = express();

app.set('view engine', 'pug');

// external use statements
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:8080" }));


// internal route use statements
app.use('/', landingRouter);

// general error handler code, more specialized error handling in utils.js

app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
