// external requires
const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const paginate = require('express-paginate');
const { lorem } = require('faker');



// internal requires
const { environment } = require('./config');
<<<<<<< HEAD
const landingRouter = require('./routes/landing');
<<<<<<< HEAD
const bookshelvesRouter = require('./routes/bookshelves');

=======
=======

//frontEnd
const path = require('path');
const landingRouter = require('./routes/landing')
const booksRouter = require('./routes/books');


//api
const apiBooksRouter = require('./routes/api-books');
const apiReviewRouter = require('./routes/api-reviews');



// internal requires
>>>>>>> ee1bb9676fa37e3df2ea2b6fe73e5e8d49c0cf77
const apibookshelvesRouter = require('./routes/api-bookshelves');
const bookshelvesRouter = require('./routes/bookshelves')
>>>>>>> daaa21b203625971d2ff758b6ecf11a66214e262
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

// external use statements
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors({ origin: "http://localhost:8080" }));
app.use(paginate.middleware(10, 50));

app.use(express.static(path.join(__dirname, 'public')));

// internal route use statements
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use('/', landingRouter);
<<<<<<< HEAD
<<<<<<< HEAD
app.use('/bookshelves', bookshelvesRouter);
=======
=======
app.use('/api-books', apiBooksRouter)
app.use('/api-reviews', apiReviewRouter)
app.use('/books', booksRouter)

>>>>>>> ee1bb9676fa37e3df2ea2b6fe73e5e8d49c0cf77
app.use('/api-bookshelves', apibookshelvesRouter);
app.use('/bookshelves', bookshelvesRouter)
>>>>>>> daaa21b203625971d2ff758b6ecf11a66214e262
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
