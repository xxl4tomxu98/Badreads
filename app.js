// external requires
const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const paginate = require('express-paginate');
const { lorem } = require('faker');



// internal requires
const { environment } = require('./config');
const path = require('path');

//frontEnd
const landingRouter = require('./routes/landing')
const booksRouter = require('./routes/books');
const userRouter = require('./routes/user')
const registerRouter = require('./routes/register')
const profileRouter = require('./routes/profile');


//api
const apiBooksRouter = require('./routes/api-books');
const apiReviewRouter = require('./routes/api-reviews');
const apiUserRouter = require('./routes/api-user');
const authUserRouter = require('./routes/auth-user')

const app = express();

app.set('view engine', 'pug');

// external use statements
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors({ origin: "http://localhost:8080" }));
app.use(paginate.middleware(10, 50));


// internal route use statements
app.use(express.static(path.join(__dirname, 'public')));

//api mounted routes
app.use('/api-books', apiBooksRouter)
app.use('/api-reviews', apiReviewRouter)
app.use('/api-user', apiUserRouter);
app.use('/auth-user', authUserRouter);

//front-end mounted routes
app.use('/books', booksRouter)
app.use('/register', registerRouter)
app.use('/user', userRouter)
app.use('/user/profile', profileRouter);

// general error handler code, more specialized error handling in utils.js
app.use('/', landingRouter);


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
