const express = require('express');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { asyncHandler } = require('../utils');
const { Book, Genre, Review } = require('../db/models');
//importing authorization to secure resources
const { requireAuth } = require('../auth')


const router = express.Router();

// router.get('/', (req, res) => {
//   res.render('search.pug')
// })

router.get('/', asyncHandler(async (req, res) => {
  const { term } = req.query;
  let books;
  if (term) {
    try {
      books = await Book.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: `%${term}%` } },
            { author: { [Op.iLike]: `%${term}%` } }
          ]
        },
        order: [['title', 'ASC']]
      });
      console.log(books);
    } catch (err) {
      console.log(err);
    }
  } else {
    books = await Book.findAll({
      limit: 10,
      order: [['title', 'ASC']]
    })
  }
  // console.log(books);
  res.render('books', { books });

}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const bookId = parseInt(req.params.id, 10)

  //weird querying for ordering join tables, only works with double square brackets for some reason
  const book = await Book.findByPk(bookId, {
    include: [{ model: Genre }, { model: Review }],
    order: [[Review, 'createdAt', 'DESC']]
  })
  res.render('book', {
    book
  }
  )
}))

//   /books/search
// how to use a search field
// router.get('/search', asyncHandler(async (req, res) => {
//     const { term } = req.query
//     console.log(term)

//     const books = await Book.findAll({
//         where: {

//             [Op.or]: [
//                 {
//                     author: {
//                         [Op.iLike]: `%${term}%`,
//                     }
//                 },
//                 {
//                     title: {
//                         [Op.iLike]: `%${term}%`,
//                     }
//                 }
//             ]

//         },
//         order: [['title', 'ASC']]
//     })
//     res.render('search-results', {
//         books
//     }
//     )

// }))

module.exports = router;
