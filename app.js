var path = require('path');


// external requires
const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser')

// internal requires
const { environment } = require('./config');

//frontEnd
const landingRouter = require('./routes/landing')
const booksRouter = require('./routes/book-page')

//api
const apiBooksRouter = require('./routes/api-books');
const apiReviewRouter = require('./routes/api-reviews');

const { lorem } = require('faker');



// internal requires
const apibookshelvesRouter = require('./routes/api-bookshelves');
const bookshelvesRouter = require('./routes/bookshelves')
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

// external use statements
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors({ origin: "http://localhost:8080" }));

app.use(express.static(path.join(__dirname, 'public')));

// internal route use statements
app.use('/', landingRouter);
app.use('/api-books', apiBooksRouter)
app.use('/books', booksRouter)
app.use('/api-reviews', apiReviewRouter)

app.use('/api-bookshelves', apibookshelvesRouter);
app.use('/bookshelves', bookshelvesRouter)
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
