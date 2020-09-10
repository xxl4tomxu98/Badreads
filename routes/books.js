const express = require('express');
const moment = require('moment');
const paginate = require('express-paginate');

const router = express.Router();
router.use(paginate.middleware(10, 50));

// let bookqueries = require('../api/book-queries.js');
const db = require('../db/models');
const { getUserToken } = require('../auth');
let { Book } = db;
const Books = `sequelize.define('Books', {})`
// const { asyncHandler } = require('../utils.js');


//working function but only allows me to pull 'all' books
// router.get('/', async (req, res) => {
//   const books = await Book.findAll({
//     limit: 10,
//     order: [['title', 'ASC']]
//   });
//   res.render('books.pug', {
//     books
//   })
// });


// paginated self made middleware (no frontend yet)
  // router.get('/books', paginatedResults(Book), (req, res) => {
  //   res.json(res.paginatedResults)
  // });

  // function paginatedResults(model) {
  //   return async (req, res, next) => {
  //     const page = parseInt(req.query.page);
  //     const limit = parseInt(req.query.limit);

  //     const startIndex = (page - 1) * limit;
  //     const endIndex = page * limit
  //     const results = {};

  //     if (endIndex < await model.countDocuments().exec()) {
  //       results.next = {
  //         page: page + 1,
  //         limit: limit
  //       }
  //     }

  //     if (startIndex > 0) {
  //       results.previous = {
  //         page: page - 1,
  //         limit: limit
  //       }
  //     }

  //     try {
  //     results.results = await model.findAll().limit(limit).skip(startIndex).exec()
  //     res.paginatedResults = results;
  //     next();
  //     } catch (e) {
  //       res.status(500).json({ message: e.message })
  //     }
  //   }
  // }

// pagination with npm package it is working to pull the page and render with pages but is not updating the books
router.get("/", (req, res, next) => {
  db.Book.findAndCountAll({ limit: req.query.limit, offset: req.skip, order:[['title', 'ASC']] })
    .then(results => {
      const itemCount = results.count;
      const pageCount = Math.ceil(results.count / req.query.limit);
      res.render('books', {
        books: results.rows,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(10, pageCount, req.query.page)
      });
    }).catch(err => next(err))
});

module.exports = router;
